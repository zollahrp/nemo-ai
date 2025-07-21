'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Swal from 'sweetalert2'
import {
  IconEye,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react'


export default function EnsiklopediaPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [filterKategori, setFilterKategori] = useState('')
  const [totalCount, setTotalCount] = useState(0)

  const [form, setForm] = useState({
    nama: '',
    nama_ilmiah: '',
    gambar_url: '',
    deskripsi: '',
    suhu: '',
    jenis: '',
    ph: '',
    oksigen: '',
    ukuran: '',
    umur: '',
    asal: '',
    kategori: '',
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

    const { data, error, count } = await supabase
      .from('ikan')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)
      .ilike('kategori', filterKategori ? `%${filterKategori}%` : '%')

    if (!error) setData(data)
    setTotalCount(count)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [currentPage, filterKategori])

  const uploadImage = async () => {
    if (!imageFile) return form.gambar_url
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

    let response
    if (editItem) {
      response = await supabase.from('ikan').update(payload).eq('id', editItem.id)
    } else {
      response = await supabase.from('ikan').insert([payload])
    }

    if (!response.error) {
      Swal.fire({
        title: 'Berhasil!',
        text: editItem ? 'Data ikan berhasil diperbarui.' : 'Data ikan berhasil disimpan.',
        icon: 'success',
        confirmButtonText: 'Oke',
      })

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
        oksigen: '',
        ukuran: '',
        umur: '',
        asal: '',
        kategori: '',
      })
      setImageFile(null)
      fetchData()
    } else {
      Swal.fire({
        title: 'Gagal!',
        text: response.error.message || 'Terjadi kesalahan saat menyimpan data.',
        icon: 'error',
        confirmButtonText: 'Tutup',
      })
    }
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Data ikan akan dihapus secara permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    })

    if (result.isConfirmed) {
      await supabase.from('ikan').delete().eq('id', id)
      fetchData()
      Swal.fire('Terhapus!', 'Data ikan berhasil dihapus.', 'success')
    }
  }

  const openEditModal = (item) => {
    setEditItem(item)
    setForm(item)
    setModalOpen(true)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Ensiklopedia Ikan</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3 bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 019 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>
          <label htmlFor="filter" className="text-sm font-medium text-gray-700">
            Kategori:
          </label>
          <select
            id="filter"
            value={filterKategori}
            onChange={(e) => {
              setCurrentPage(1)
              setFilterKategori(e.target.value)
            }}
            className="text-sm border-none bg-transparent focus:outline-none focus:ring-0"
          >
            <option value="">Semua</option>
            {kategoriList.map((kat) => (
              <option key={kat} value={kat}>
                {kat}
              </option>
            ))}
          </select>
        </div>

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
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Tambah Ikan
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Ilmiah</th>
                <th className="px-4 py-2">Kategori</th>
                <th className="px-4 py-2">Deskripsi</th>
                <th className="px-4 py-2">Gambar</th>
                <th className="px-4 py-2">Suhu</th>
                <th className="px-4 py-2">Jenis</th>
                <th className="px-4 py-2">pH</th>
                <th className="px-4 py-2">Oksigen</th>
                <th className="px-4 py-2">Ukuran</th>
                <th className="px-4 py-2">Umur</th>
                <th className="px-4 py-2">Asal</th>
                <th className="px-4 py-2">Dibuat</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {data.map((ikan) => (
                <tr key={ikan.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{ikan.nama}</td>
                  <td className="px-4 py-2 italic">{ikan.nama_ilmiah}</td>
                  <td className="px-4 py-2">{ikan.kategori}</td>
                  <td className="px-4 py-2">{ikan.deskripsi?.slice(0, 60)}...</td>
                  <td className="px-4 py-2">
                    {ikan.gambar_url && (
                      <img
                        src={ikan.gambar_url}
                        alt={ikan.nama}
                        className="w-14 h-14 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2">{ikan.suhu}</td>
                  <td className="px-4 py-2">{ikan.jenis}</td>
                  <td className="px-4 py-2">{ikan.ph}</td>
                  <td className="px-4 py-2">{ikan.oksigen}</td>
                  <td className="px-4 py-2">{ikan.ukuran}</td>
                  <td className="px-4 py-2">{ikan.umur}</td>
                  <td className="px-4 py-2">{ikan.asal}</td>
                  <td className="px-4 py-2">
                    {new Date(ikan.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2 items-center">
                      <a
                        href={`/dashboard/ensiklopedia/detail/${ikan.id}`}
                        className="text-green-600 hover:text-green-800"
                        title="Lihat"
                      >
                        <IconEye size={20} />
                      </a>
                      <button
                        onClick={() => openEditModal(ikan)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <IconPencil size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(ikan.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Hapus"
                      >
                        <IconTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center px-4 py-3 border-t bg-gray-50 text-sm text-gray-600">
            <div>
              Menampilkan {Math.min((currentPage - 1) * pageSize + 1, data.length)} -{' '}
              {Math.min(currentPage * pageSize, totalCount)} dari {totalCount}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: Math.ceil(totalCount / pageSize) }).map((_, idx) => {
                const page = idx + 1
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded ${currentPage === page ? 'bg-blue-600 text-white' : ''}`}
                  >
                    {page}
                  </button>
                )
              })}
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 border rounded"
              >
                Next
              </button>
            </div>
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
              <input
                type="text"
                placeholder="Nama"
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                required
              />

              <input
                type="text"
                placeholder="Nama Ilmiah"
                value={form.nama_ilmiah}
                onChange={(e) => setForm({ ...form, nama_ilmiah: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />

              {/* Dropdown kategori */}
              <select
                value={form.kategori}
                onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">-- Pilih Kategori --</option>
                {kategoriList.map((kat) => (
                  <option key={kat} value={kat}>
                    {kat}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Suhu"
                value={form.suhu}
                onChange={(e) => setForm({ ...form, suhu: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="text"
                placeholder="Jenis"
                value={form.jenis}
                onChange={(e) => setForm({ ...form, jenis: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="text"
                placeholder="pH"
                value={form.ph}
                onChange={(e) => setForm({ ...form, ph: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="text"
                placeholder="Oksigen"
                value={form.oksigen ?? ''}
                onChange={(e) => setForm({ ...form, oksigen: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="text"
                placeholder="Ukuran"
                value={form.ukuran ?? ''}
                onChange={(e) => setForm({ ...form, ukuran: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="text"
                placeholder="Umur"
                value={form.umur ?? ''}
                onChange={(e) => setForm({ ...form, umur: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="text"
                placeholder="Asal"
                value={form.asal ?? ''}
                onChange={(e) => setForm({ ...form, asal: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />

              {/* Deskripsi */}
              <textarea
                placeholder="Deskripsi"
                value={form.deskripsi}
                onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />

              {/* Upload Gambar dengan desain modern dan presisi */}
              <div className="w-full">
                <label
                  htmlFor="upload"
                  className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 15a4 4 0 014-4h1m4 0h1a4 4 0 014 4v2a4 4 0 01-4 4H7a4 4 0 01-4-4v-2z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 12V3m0 0l3 3m-3-3L9 6"
                      />
                    </svg>
                    <p className="text-sm">
                      <span className="font-medium text-blue-600">Klik untuk unggah</span>{' '}
                      atau tarik gambar ke sini
                    </p>
                    {imageFile && (
                      <p className="text-xs text-green-600 mt-1 truncate max-w-xs">
                        {imageFile.name}
                      </p>
                    )}
                  </div>
                  <input
                    id="upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </label>
              </div>

              {/* Tombol Simpan / Batal */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
