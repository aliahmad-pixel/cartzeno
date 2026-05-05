import { createContext, useContext, useState, useCallback, type ReactNode, useEffect } from 'react'
import * as XLSX from 'xlsx'
import { supabase } from '../lib/supabase'
import { type Product } from '../data/products'

export interface OrderItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export interface Order {
  id: string
  customerName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  paymentMethod: 'cod' | 'card'
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  notes?: string
}

export interface StoreSettings {
  storeName: string
  currency: string
  currencySymbol: string
  exchangeRate: number
  freeShippingThreshold: number
  shippingCost: number
  codEnabled: boolean
  cardPaymentEnabled: boolean
  adminPassword: string
  instagram?: string
  twitter?: string
  facebook?: string
  email?: string
  whatsapp?: string
  saleActive: boolean
  saleEndTime: string
  saleDiscount: number
  saleBannerText: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  createdAt: string
}

export interface Category {
  name: string
  image: string
  count: number
}

export interface Testimonial {
  id: number
  quote: string
  name: string
  role: string
  avatar: string
}

export interface FAQ {
  question: string
  answer: string
}

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'Cartzeno',
  currency: 'PKR',
  currencySymbol: 'Rs',
  exchangeRate: 1,
  freeShippingThreshold: 50,
  shippingCost: 5,
  codEnabled: true,
  cardPaymentEnabled: true,
  adminPassword: 'admin123',
  instagram: '#',
  twitter: '#',
  facebook: '#',
  email: 'hello@cartzeno.com',
  whatsapp: '03404524811',
  saleActive: false,
  saleEndTime: '',
  saleDiscount: 20,
  saleBannerText: 'Flash Sale - Limited Time Only!'
}

interface AdminContextType {
  products: Product[]
  orders: Order[]
  settings: StoreSettings
  contactSubmissions: ContactSubmission[]
  categories: Category[]
  testimonials: Testimonial[]
  faqs: FAQ[]
  isLoading: boolean
  isAuthLoading: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>
  deleteProduct: (id: number) => Promise<void>
  saveOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => Promise<string | null>
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>
  deleteOrder: (orderId: string) => Promise<void>
  updateSettings: (settings: Partial<StoreSettings>) => Promise<void>
  addContactSubmission: (submission: Omit<ContactSubmission, 'id' | 'createdAt'>) => Promise<void>
  deleteContactSubmission: (id: string) => Promise<void>
  exportOrdersToExcel: () => void
  exportProductsToExcel: () => void
  formatPrice: (price: number) => string
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS)
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session)
      setIsAuthLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session)
      setIsAuthLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      
      // Fetch Products
      const { data: productsData } = await supabase.from('products').select('*').order('created_at', { ascending: false })
      if (productsData) {
        setProducts(productsData.map(p => ({
          ...p,
          originalPrice: p.original_price
        })))
      }

      // Fetch Orders
      const { data: ordersData } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
      if (ordersData) {
        setOrders(ordersData.map(o => ({
          ...o,
          customerName: o.customer_name,
          paymentMethod: o.payment_method,
          createdAt: o.created_at
        })))
      }

      // Fetch Settings
      const { data: settingsData } = await supabase.from('settings').select('*')
      if (settingsData && settingsData.length > 0) {
        const settingsObj = settingsData.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {})
        setSettings(prev => ({ ...prev, ...settingsObj }))
      }

      // Fetch Contacts
      const { data: contactsData } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false })
      if (contactsData) {
        setContactSubmissions(contactsData.map(c => ({
          ...c,
          createdAt: c.created_at
        })))
      }

      // Fetch Categories
      const { data: categoriesData } = await supabase.from('categories').select('*')
      if (categoriesData) {
        setCategories(categoriesData)
      }

      // Fetch Testimonials
      const { data: testimonialsData } = await supabase.from('testimonials').select('*')
      if (testimonialsData) {
        setTestimonials(testimonialsData)
      }

      // Fetch FAQs
      const { data: faqsData } = await supabase.from('faqs').select('*')
      if (faqsData) {
        setFaqs(faqsData)
      }

    } catch (error) {
      console.error('Error fetching data from Supabase:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const login = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      return { success: false, error: error.message }
    }
    
    return { success: true }
  }, [])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setIsAdmin(false)
  }, [])

  const addProduct = useCallback(async (product: Omit<Product, 'id'>) => {
    const { originalPrice, ...rest } = product
    const { data, error } = await supabase.from('products').insert([{
      ...rest,
      original_price: originalPrice
    }]).select()
    
    if (data && !error) {
      setProducts(prev => [{ ...data[0], originalPrice: data[0].original_price }, ...prev])
    }
  }, [])

  const updateProduct = useCallback(async (id: number, updates: Partial<Product>) => {
    const { originalPrice, id: _id, ...rest } = updates as any
    const updateData: any = { ...rest }
    if (originalPrice !== undefined) {
      updateData.original_price = originalPrice
    }

    const { error } = await supabase.from('products').update(updateData).eq('id', id)
    
    if (!error) {
      setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)))
    }
  }, [])

  const deleteProduct = useCallback(async (id: number) => {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== id))
    }
  }, [])

  const saveOrder = useCallback(async (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<string | null> => {
    const orderId = 'OC-' + Math.random().toString(36).substring(2, 10).toUpperCase()
    const newOrder = {
      id: orderId,
      customer_name: orderData.customerName,
      email: orderData.email,
      phone: orderData.phone,
      address: orderData.address,
      city: orderData.city,
      postal_code: orderData.postalCode,
      payment_method: orderData.paymentMethod,
      items: orderData.items,
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      total: orderData.total,
      status: 'pending',
      notes: orderData.notes
    }

    const { error } = await supabase.from('orders').insert([newOrder])
    if (!error) {
      setOrders(prev => [{ ...orderData, id: orderId, status: 'pending', createdAt: new Date().toISOString() } as Order, ...prev])
      return orderId
    }
    return null
  }, [])

  const updateOrderStatus = useCallback(async (orderId: string, status: Order['status']) => {
    const { error } = await supabase.from('orders').update({ status }).eq('id', orderId)
    if (!error) {
      setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status } : o)))
    }
  }, [])

  const deleteOrder = useCallback(async (orderId: string) => {
    const { error } = await supabase.from('orders').delete().eq('id', orderId)
    if (!error) {
      setOrders(prev => prev.filter(o => o.id !== orderId))
    }
  }, [])

  const addContactSubmission = useCallback(async (submission: Omit<ContactSubmission, 'id' | 'createdAt'>) => {
    const id = 'MSG-' + Math.random().toString(36).substring(2, 8).toUpperCase()
    const { error } = await supabase.from('contact_submissions').insert([{
      id,
      ...submission
    }])
    if (!error) {
      setContactSubmissions(prev => [{ ...submission, id, createdAt: new Date().toISOString() }, ...prev])
    }
  }, [])

  const deleteContactSubmission = useCallback(async (id: string) => {
    const { error } = await supabase.from('contact_submissions').delete().eq('id', id)
    if (!error) {
      setContactSubmissions(prev => prev.filter(s => s.id !== id))
    }
  }, [])

  const updateSettings = useCallback(async (updates: Partial<StoreSettings>) => {
    const entries = Object.entries(updates).map(([key, value]) => ({ key, value }))
    const { error } = await supabase.from('settings').upsert(entries)
    if (!error) {
      setSettings(prev => ({ ...prev, ...updates }))
    }
  }, [])

  const formatPrice = useCallback((price: number) => {
    const converted = price * settings.exchangeRate
    return `${settings.currencySymbol}${converted.toFixed(2)}`
  }, [settings.currencySymbol, settings.exchangeRate])

  const exportOrdersToExcel = useCallback(() => {
    const data = orders.map(order => ({
      'Order ID': order.id,
      'Date': new Date(order.createdAt).toLocaleDateString(),
      'Customer Name': order.customerName,
      'Email': order.email,
      'Phone': order.phone,
      'Address': order.address,
      'City': order.city,
      'Postal Code': order.postalCode,
      'Payment Method': order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card',
      'Items': order.items.map(i => `${i.name} (x${i.quantity})`).join(', '),
      'Subtotal': order.subtotal,
      'Shipping': order.shipping,
      'Total': order.total,
      'Status': order.status.charAt(0).toUpperCase() + order.status.slice(1)
    }))

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Orders')
    XLSX.writeFile(wb, `Cartzeno_Orders_${new Date().toISOString().split('T')[0]}.xlsx`)
  }, [orders])

  const exportProductsToExcel = useCallback(() => {
    const data = products.map(p => ({
      'ID': p.id,
      'Name': p.name,
      'Category': p.category,
      'Price': p.price,
      'Original Price': p.originalPrice || '',
      'Stock': p.stock,
      'Rating': p.rating,
      'Reviews': p.reviews,
      'Badge': p.badge || '',
      'Description': p.description,
      'Features': p.features.join(', ')
    }))

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Products')
    XLSX.writeFile(wb, `Cartzeno_Products_${new Date().toISOString().split('T')[0]}.xlsx`)
  }, [products])

  return (
    <AdminContext.Provider value={{
      products,
      orders,
      settings,
      contactSubmissions,
      categories,
      testimonials,
      faqs,
      isLoading,
      isAuthLoading,
      isAdmin,
      login,
      logout,
      addProduct,
      updateProduct,
      deleteProduct,
      saveOrder,
      updateOrderStatus,
      deleteOrder,
      updateSettings,
      addContactSubmission,
      deleteContactSubmission,
      exportOrdersToExcel,
      exportProductsToExcel,
      formatPrice
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) throw new Error('useAdmin must be used within an AdminProvider')
  return context
}

