'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Swal from 'sweetalert2'
import {
    IconEye,
    IconPencil,
    IconTrash,
} from '@tabler/icons-react'

export default function PenyakitPage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [editData, setEditData] = useState(null)
    const [formData, setFormData] = useState({
        nama_penyakit: '',
        deskripsi: '',
        gejala: '',
        solusi: '',
        gambar_url: '',
    })
    const pageSize = 10

    const fetchData = async () => {
        setLoading(true)
        const from = (currentPage - 1) * pageSize
        const to = from + pageSize - 1

        const { data, error, count } = await supabase
            .from('penyakit')
            .select('*', { count: 'exact' })
            .range(from, to)

        if (!error) {
            setData(data)
            setTotalCount(count)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [currentPage])

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Yakin ingin menghapus?',
            text: 'Data penyakit akan dihapus secara permanen!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        })

        if (result.isConfirmed) {
            await supabase.from('penyakit').delete().eq('id', id)
            fetchData()
            Swal.fire('Terhapus!', 'Data penyakit berhasil dihapus.', 'success')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { error } = editData
            ? await supabase.from('penyakit').update(formData).eq('id', editData.id)
            : await supabase.from('penyakit').insert(formData)

        if (error) {
            Swal.fire('Gagal!', error.message, 'error')
            return
        }

        await fetchData() // pastikan tunggu sampai fetch selesai

        Swal.fire(
            'Berhasil!',
            editData ? 'Data penyakit berhasil diperbarui.' : 'Data penyakit berhasil ditambahkan.',
            'success'
        )

        setShowModal(false)
        setEditData(null)
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Data Penyakit Ikan</h1>

            <div className="mb-4 flex justify-end">
                <button
                    onClick={() => {
                        setEditData(null)
                        setFormData({
                            nama_penyakit: '',
                            deskripsi: '',
                            gejala: '',
                            solusi: '',
                            gambar_url: '',
                        })
                        setShowModal(true)
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Tambah Penyakit
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
                                <th className="px-4 py-2">Deskripsi</th>
                                <th className="px-4 py-2">Gejala</th>
                                <th className="px-4 py-2">Solusi</th>
                                <th className="px-4 py-2">Gambar</th>
                                <th className="px-4 py-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {data.map((penyakit) => (
                                <tr key={penyakit.id} className="border-t hover:bg-gray-50 transition">
                                    <td className="px-4 py-2">{penyakit.nama_penyakit}</td>
                                    <td className="px-4 py-2">{penyakit.deskripsi?.slice(0, 60)}...</td>
                                    <td className="px-4 py-2">{penyakit.gejala?.slice(0, 60)}...</td>
                                    <td className="px-4 py-2">{penyakit.solusi?.slice(0, 60)}...</td>
                                    <td className="px-4 py-2">
                                        {penyakit.gambar_url && (
                                            <img
                                                src={penyakit.gambar_url}
                                                alt={penyakit.nama_penyakit}
                                                className="w-14 h-14 object-cover rounded"
                                            />
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex gap-2 items-center">
                                            <a
                                                href={`/dashboard/penyakit/detail/${penyakit.id}`}
                                                className="text-green-600 hover:text-green-800"
                                                title="Lihat"
                                            >
                                                <IconEye size={20} />
                                            </a>
                                            <button
                                                onClick={() => {
                                                    setEditData(penyakit)
                                                    setFormData(penyakit)
                                                    setShowModal(true)
                                                }}
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Edit"
                                            >
                                                <IconPencil size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(penyakit.id)}
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
                            Menampilkan {Math.min((currentPage - 1) * pageSize + 1, totalCount)} -{' '}
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
                                        className={`px-3 py-1 border rounded ${currentPage === page ? 'bg-blue-600 text-white' : ''
                                            }`}
                                    >
                                        {page}
                                    </button>
                                )
                            })}
                            <button
                                onClick={() =>
                                    setCurrentPage((p) => Math.min(p + 1, Math.ceil(totalCount / pageSize)))
                                }
                                disabled={currentPage === Math.ceil(totalCount / pageSize)}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Tambah/Edit */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                        <h2 className="text-xl font-semibold mb-4">
                            {editData ? 'Edit Penyakit' : 'Tambah Penyakit'}
                        </h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                            <input
                                type="text"
                                placeholder="Nama Penyakit"
                                value={formData.nama_penyakit}
                                onChange={(e) => setFormData({ ...formData, nama_penyakit: e.target.value })}
                                required
                                className="border p-2 rounded"
                            />
                            <textarea
                                placeholder="Deskripsi"
                                value={formData.deskripsi}
                                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                                className="border p-2 rounded"
                            />
                            <textarea
                                placeholder="Gejala"
                                value={formData.gejala}
                                onChange={(e) => setFormData({ ...formData, gejala: e.target.value })}
                                className="border p-2 rounded"
                            />
                            <textarea
                                placeholder="Solusi"
                                value={formData.solusi}
                                onChange={(e) => setFormData({ ...formData, solusi: e.target.value })}
                                className="border p-2 rounded"
                            />
                            <input
                                type="url"
                                placeholder="Gambar URL"
                                value={formData.gambar_url}
                                onChange={(e) => setFormData({ ...formData, gambar_url: e.target.value })}
                                className="border p-2 rounded"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false)
                                        setEditData(null)
                                    }}
                                    className="px-4 py-2 bg-gray-200 rounded"
                                >
                                    Batal
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                                    {editData ? 'Simpan Perubahan' : 'Tambah'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
