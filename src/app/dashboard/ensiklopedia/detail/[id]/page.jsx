'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export default function DetailIkan() {
  const { id } = useParams();
  const router = useRouter();
  const [ikan, setIkan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from('ikan')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error:', error);
      } else {
        setIkan(data);
      }
      setLoading(false);
    };

    fetchDetail();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!ikan) return <p className="p-6 text-red-500">Data tidak ditemukan untuk ID: {id}</p>;

  return (
    <div className="p-6 space-y-4">
      {/* Header: Tombol kembali + tanggal */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </button>
        <p className="text-sm text-gray-500">
          Dibuat pada: {new Date(ikan.created_at).toLocaleString('id-ID')}
        </p>
      </div>

      {/* Konten utama */}
      <div className="bg-white shadow-lg rounded-xl md:px-8 px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Kiri: Gambar + Nama */}
        <div className="md:w-5/18 space-y-4 text-center md:text-left">
          {ikan.gambar_url && (
            <Image
              src={ikan.gambar_url}
              alt={ikan.nama}
              width={400}
              height={300}
              className="rounded-xl object-cover border mx-auto md:mx-0"
            />
          )}
          <h1 className="text-3xl font-bold text-gray-800">{ikan.nama}</h1>
          <p className="italic text-gray-500">{ikan.nama_ilmiah}</p>
        </div>

        {/* Kanan: Spesifikasi + Deskripsi */}
        <div className="md:w-7/12 space-y-6 text-sm md:text-base">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <p className="text-gray-500">Kategori:</p>
            <p className="font-medium text-gray-800">{ikan.kategori}</p>

            <p className="text-gray-500">Jenis:</p>
            <p className="font-medium text-gray-800">{ikan.jenis}</p>

            <p className="text-gray-500">Suhu Ideal:</p>
            <p className="font-medium text-gray-800">{ikan.suhu}</p>

            <p className="text-gray-500">pH Ideal:</p>
            <p className="font-medium text-gray-800">{ikan.ph}</p>

            <p className="text-gray-500">Kadar Oksigen:</p>
            <p className="font-medium text-gray-800">{ikan.oksigen}</p>

            <p className="text-gray-500">Ukuran:</p>
            <p className="font-medium text-gray-800">{ikan.ukuran}</p>

            <p className="text-gray-500">Umur:</p>
            <p className="font-medium text-gray-800">{ikan.umur}</p>

            <p className="text-gray-500">Asal:</p>
            <p className="font-medium text-gray-800">{ikan.asal}</p>
          </div>

          <hr className="border-t border-gray-200 my-4" />

          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Deskripsi:</h3>
            <p className="text-justify text-gray-700 leading-relaxed">
              {ikan.deskripsi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
