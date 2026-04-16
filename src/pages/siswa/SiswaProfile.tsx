import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Save } from 'lucide-react';

export default function SiswaProfile() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Profil Saya</h2>
        <p className="text-slate-500">Lihat dan perbarui informasi pribadi Anda.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Data Diri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nisn">NISN</Label>
              <Input id="nisn" value="0012345678" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nis">NIS</Label>
              <Input id="nis" value="1001" disabled />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" value={user?.name || ''} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ttl_tempat">Tempat Lahir</Label>
              <Input id="ttl_tempat" defaultValue="Jakarta" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ttl_tanggal">Tanggal Lahir</Label>
              <Input id="ttl_tanggal" type="date" defaultValue="2007-05-15" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Jenis Kelamin</Label>
              <Input id="gender" value="Laki-laki" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Kelas / Jurusan</Label>
              <Input id="class" value="XI-IPA-1 / MIPA" disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Kontak</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Alamat Lengkap</Label>
              <Input id="address" defaultValue="Jl. Merdeka No. 123, Jakarta Selatan" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input id="phone" defaultValue="081234567890" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user?.email || ''} />
            </div>
          </div>
          <div className="pt-4 flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
