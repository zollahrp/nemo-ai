'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function EnsiklopediaPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [imageFile, setImageFile] = useState(null)

  const [form, setForm] = useState({
    nama: '',
    nama_ilmiah: '',
    gambar_url: '',
    deskripsi: '',
    suhu: '',
    jenis: '',
    ph: '',
  })

  const kategoriList = [
    'Ikan Air Tawar',
    'Ikan Laut',
    'Ikan Air Payau',
    'Ikan Air Dingin',
    'Ikan Predator',
    'Invertabrata',
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const fetchData = async () => {
    setLoading(true)
    const from = (currentPage - 1) * pageSize
    const to = from + pageSize - 1

    const { data, error } = await supabase
      .from('ikan')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to)

    if (!error) setData(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [currentPage])

  const uploadImage = async () => {
    if (!imageFile) return form.gambar_url // skip kalau gak ada file baru
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const { data, error } = await supabase.storage
      .from('ikan')
      .upload(fileName, imageFile)

    if (error) {
      console.error(error)
      return ''
    }

    const { data: publicUrl } = supabase.storage
      .from('ikan')
      .getPublicUrl(fileName)

    return publicUrl.publicUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const imageUrl = await uploadImage()
    const payload = { ...form, gambar_url: imageUrl }

    if (editItem) {
      await supabase.from('ikan').update(payload).eq('id', editItem.id)
    } else {
      await supabase.from('ikan').insert([payload])
    }

    setModalOpen(false)
    setEditItem(null)
    setForm({
      nama: '',
      nama_ilmiah: '',
      gambar_url: '',
      deskripsi: '',
      suhu: '',
      jenis: '',
      ph: '',
    })
    setImageFile(null)
    fetchData()
  }

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin hapus data ini?')) {
      await supabase.from('ikan').delete().eq('id', id)
      fetchData()
    }
  }

  const openEditModal = (item) => {
    setEditItem(item)
    setForm(item)
    setModalOpen(true)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Ensiklopedia Ikan</h1>
        <button
          onClick={() => {
            setEditItem(null)
            setForm({
              nama: '',
              nama_ilmiah: '',
              gambar_url: '',
              deskripsi: '',
              suhu: '',
              jenis: '',
              ph: '',
            })
            setImageFile(null)
            setModalOpen(true)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Tambah Ikan
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Ilmiah</th>
                <th className="px-4 py-2">Gambar</th>
                <th className="px-4 py-2">Suhu</th>
                <th className="px-4 py-2">pH</th>
                <th className="px-4 py-2">Jenis</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ikan) => (
                <tr key={ikan.id} className="border-t">
                  <td className="px-4 py-2">{ikan.nama}</td>
                  <td className="px-4 py-2 italic">{ikan.nama_ilmiah}</td>
                  <td className="px-4 py-2">
                    {ikan.gambar_url && (
                      <img src={ikan.gambar_url} alt={ikan.nama} className="w-14 h-14 object-cover rounded" />
                    )}
                  </td>
                  <td className="px-4 py-2">{ikan.suhu}</td>
                  <td className="px-4 py-2">{ikan.ph}</td>
                  <td className="px-4 py-2">{ikan.jenis}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => openEditModal(ikan)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(ikan.id)} className="text-red-600 hover:underline">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-end gap-2 p-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded"
            >
              Prev
            </button>
            <span className="px-3 py-1">Hal. {currentPage}</span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 border rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              {editItem ? 'Edit Ikan' : 'Tambah Ikan'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" placeholder="Nama" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="w-full border px-3 py-2 rounded" required />
              <input type="text" placeholder="Nama Ilmiah" value={form.nama_ilmiah} onChange={(e) => setForm({ ...form, nama_ilmiah: e.target.value })} className="w-full border px-3 py-2 rounded" />
              <textarea placeholder="Deskripsi" value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} className="w-full border px-3 py-2 rounded" />
              <input type="text" placeholder="Suhu" value={form.suhu} onChange={(e) => setForm({ ...form, suhu: e.target.value })} className="w-full border px-3 py-2 rounded" />
              <input type="text" placeholder="pH" value={form.ph} onChange={(e) => setForm({ ...form, ph: e.target.value })} className="w-full border px-3 py-2 rounded" />
              <select value={form.jenis} onChange={(e) => setForm({ ...form, jenis: e.target.value })} className="w-full border px-3 py-2 rounded">
                <option value="">-- Pilih Jenis --</option>
                {kategoriList.map((kat) => (
                  <option key={kat} value={kat}>{kat}</option>
                ))}
              </select>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full border px-3 py-2 rounded" />
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
