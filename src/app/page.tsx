
'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {  Globe, Ship, Package, Percent, DollarSign, Calculator, FileText } from 'lucide-react'
import { fetchNegaras, fetchPelabuhans, fetchBarangs } from '@/services/api'
import { Negara, Pelabuhan, Barang } from '@/types/api'

export default function Home() {
  const [formData, setFormData] = useState({
    negara: '',
    pelabuhan: '',
    barang: '',
    discount: '',
    harga: '',
    total: ''
  })
  
  const [barangDescription, setBarangDescription] = useState('')
  const [negaraOptions, setNegaraOptions] = useState<{ value: string; label: string }[]>([])
  const [pelabuhanOptions, setPelabuhanOptions] = useState<{ value: string; label: string }[]>([])
  const [barangOptions, setBarangOptions] = useState<{ value: string; label: string; description: string; harga: number; diskon: number }[]>([])
  const [loading, setLoading] = useState({
    negara: false,
    pelabuhan: false,
    barang: false
  })

  // Load data negara saat komponen dimount
  useEffect(() => {
    loadNegaras()
  }, [])

  // Load data pelabuhan ketika negara berubah
  useEffect(() => {
    if (formData.negara) {
      loadPelabuhans(formData.negara)
    } else {
      setPelabuhanOptions([])
      setFormData(prev => ({ ...prev, pelabuhan: '', barang: '', harga: '', discount: '', total: '' }))
      setBarangDescription('')
    }
  }, [formData.negara])

  // Load data barang ketika pelabuhan berubah
  useEffect(() => {
    if (formData.pelabuhan) {
      loadBarangs(formData.pelabuhan)
    } else {
      setBarangOptions([])
      setFormData(prev => ({ ...prev, barang: '', harga: '', discount: '', total: '' }))
      setBarangDescription('')
    }
  }, [formData.pelabuhan])

  const loadNegaras = async () => {
    setLoading(prev => ({ ...prev, negara: true }))
    try {
      const data: Negara[] = await fetchNegaras()
      const options = data.map(item => ({
        value: item.id_negara.toString(),
        label: `${item.kode_negara} - ${item.nama_negara}`
      }))
      setNegaraOptions(options)
    } catch (error) {
      console.error('Error loading negaras:', error)
    } finally {
      setLoading(prev => ({ ...prev, negara: false }))
    }
  }

  const loadPelabuhans = async (idNegara: string) => {
    setLoading(prev => ({ ...prev, pelabuhan: true }))
    try {
      const data: Pelabuhan[] = await fetchPelabuhans(idNegara)
      const options = data.map(item => ({
        value: item.id_pelabuhan.toString(),
        label: item.nama_pelabuhan
      }))
      setPelabuhanOptions(options)
    } catch (error) {
      console.error('Error loading pelabuhans:', error)
    } finally {
      setLoading(prev => ({ ...prev, pelabuhan: false }))
    }
  }

  const loadBarangs = async (idPelabuhan: string) => {
    setLoading(prev => ({ ...prev, barang: true }))
    try {
      const data: Barang[] = await fetchBarangs(idPelabuhan)
      const options = data.map(item => ({
        value: item.id_barang.toString(),
        label: `${item.id_barang} - ${item.nama_barang}`,
        description: item.description || '',
        harga: item.harga || 0,
        diskon: item.diskon || 0
      }))
      setBarangOptions(options)
    } catch (error) {
      console.error('Error loading barangs:', error)
    } finally {
      setLoading(prev => ({ ...prev, barang: false }))
    }
  }

  // Handle form changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value }
      
      // Reset cascading data when negara changes
      if (field === 'negara') {
        newData.pelabuhan = ''
        newData.barang = ''
        newData.harga = ''
        newData.discount = ''
        newData.total = ''
        setPelabuhanOptions([])
        setBarangOptions([])
        setBarangDescription('')
      }
      
      // Reset cascading data when pelabuhan changes
      if (field === 'pelabuhan') {
        newData.barang = ''
        newData.harga = ''
        newData.discount = ''
        newData.total = ''
        setBarangOptions([])
        setBarangDescription('')
      }
      
      // Auto calculate total when harga or discount changes
      if (field === 'harga' || field === 'discount') {
        const harga = parseFloat(field === 'harga' ? value : newData.harga) || 0
        const discount = parseFloat(field === 'discount' ? value : newData.discount) || 0
        const total = harga * (1 - discount / 100)
        newData.total = `Rp. ${total.toLocaleString('id-ID')}`
      }
      
      return newData
    })
  }

  // Handle barang selection
  const handleBarangChange = (value: string) => {
    const selectedBarang = barangOptions.find(item => item.value === value)
    if (selectedBarang) {
      setFormData(prev => ({ 
        ...prev, 
        barang: value,
        harga: selectedBarang.harga.toString(),
        discount: selectedBarang.diskon.toString()
      }))
      console.log("selectedBarang",selectedBarang)
      setBarangDescription(selectedBarang.description || '')
      
      // Auto calculate total
      console.log('a',1 - selectedBarang.diskon )
      const total = selectedBarang.harga * (1 - selectedBarang.diskon / 100)
      setFormData(prev => ({ ...prev, total: `Rp. ${total.toLocaleString('id-ID')}` }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SOAL TEST FRONTEND DEVELOPER
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Form Pengisian Data Barang dengan Auto-Complete</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 md:p-12">
          <div className="space-y-8">
            {/* NEGARA */}
            <div className="group">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-center gap-3 lg:w-32">
                  <Globe className="w-5 h-5 text-blue-500" />
                  <label className="text-sm font-semibold text-gray-700">NEGARA</label>
                </div>
                <span className="hidden lg:block text-sm text-gray-400">:</span>
                <div className="flex-1 max-w-xs">
                  <Select value={formData.negara} onValueChange={(value) => handleInputChange('negara', value)} disabled={loading.negara}>
                    <SelectTrigger className="w-full border-2 border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-colors duration-200 rounded-xl bg-white/50">
                      <SelectValue placeholder={loading.negara ? "Loading..." : "Pilih Negara"} />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-0 shadow-xl">
                      {negaraOptions.map(option => (
                        <SelectItem key={option.value} value={option.value} className="rounded-lg">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* PELABUHAN */}
            <div className="group">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="flex items-center gap-3 lg:w-32">
                  <Ship className="w-5 h-5 text-indigo-500" />
                  <label className="text-sm font-semibold text-gray-700">PELABUHAN</label>
                </div>
                <span className="hidden lg:block text-sm text-gray-400 mt-2">:</span>
                <div className="flex-1 max-w-xs">
                  <Select value={formData.pelabuhan} onValueChange={(value) => handleInputChange('pelabuhan', value)} disabled={loading.pelabuhan || !formData.negara}>
                    <SelectTrigger className="w-full border-2 border-gray-200 hover:border-indigo-400 focus:border-indigo-500 transition-colors duration-200 rounded-xl bg-white/50">
                      <SelectValue placeholder={loading.pelabuhan ? "Loading..." : !formData.negara ? "Pilih Negara dulu" : "Pilih Pelabuhan"} />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-0 shadow-xl">
                      {pelabuhanOptions.map(option => (
                        <SelectItem key={option.value} value={option.value} className="rounded-lg">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* BARANG */}
            <div className="group">
              <div className="space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex items-center gap-3 lg:w-32">
                    <Package className="w-5 h-5 text-purple-500" />
                    <label className="text-sm font-semibold text-gray-700">BARANG</label>
                  </div>
                  <span className="hidden lg:block text-sm text-gray-400">:</span>
                  <div className="flex-1 max-w-xs">
                    <Select value={formData.barang} onValueChange={handleBarangChange} disabled={loading.barang || !formData.pelabuhan}>
                      <SelectTrigger className="w-full border-2 border-gray-200 hover:border-purple-400 focus:border-purple-500 transition-colors duration-200 rounded-xl bg-white/50">
                        <SelectValue placeholder={loading.barang ? "Loading..." : !formData.pelabuhan ? "Pilih Pelabuhan dulu" : "Pilih Barang"} />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-0 shadow-xl">
                        {barangOptions.map(option => (
                          <SelectItem key={option.value} value={option.value} className="rounded-lg">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Description Box */}
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="lg:w-32"></div>
                  <span className="hidden lg:block text-sm text-gray-400 mt-2">:</span>
                  <div className="flex-1 max-w-xs">
                    <Textarea 
                      value={barangDescription}
                      readOnly
                      className="min-h-20 border-2 border-gray-200 bg-gray-50 resize-none rounded-xl transition-colors duration-200"
                      placeholder="Deskripsi Barang "
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* DISCOUNT */}
            <div className="group">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-center gap-3 lg:w-32">
                  <Percent className="w-5 h-5 text-orange-500" />
                  <label className="text-sm font-semibold text-gray-700">DISCOUNT</label>
                </div>
                <span className="hidden lg:block text-sm text-gray-400">:</span>
                <div className="flex items-center gap-2">
                  <Input 
                    type="number"
                    value={formData.discount}
                    onChange={(e) => handleInputChange("discount", e.target.value)}
                    className="w-24 border-2 border-gray-200 rounded-xl"
                    placeholder="0"
                  />
                  <span className="text-sm font-medium text-orange-500 bg-orange-100 px-2 py-1 rounded-lg">%</span>
                </div>
              </div>
            </div>

            {/* HARGA */}
            <div className="group">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-center gap-3 lg:w-32">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <label className="text-sm font-semibold text-gray-700">HARGA</label>
                </div>
                <span className="hidden lg:block text-sm text-gray-400">:</span>
                <div className="flex-1 max-w-xs">
                  <Input 
                    type="number"
                    value={formData.harga}
                    onChange={(e) => handleInputChange("harga", e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* TOTAL */}
            <div className="group">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-center gap-3 lg:w-32">
                  <Calculator className="w-5 h-5 text-red-500" />
                  <label className="text-sm font-semibold text-gray-700">TOTAL</label>
                </div>
                <span className="hidden lg:block text-sm text-gray-400">:</span>
                <div className="flex-1 max-w-xs">
                  <Input 
                    value={formData.total}
                    readOnly
                    className="w-full border-2 border-gray-200 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl font-semibold text-red-600"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}



