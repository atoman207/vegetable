"use client";

import { useState, type FormEvent } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/sonner";
import { useProducers, useUpsertProducer, useDeleteProducer } from "@/hooks/use-content";
import type { Producer } from "@/lib/database.types";

type FormState = {
  id?: string;
  num: string;
  name: string;
  name_en: string;
  region: string;
  image_url: string;
  items: string;
  note: string;
  sort_order: number;
};

const empty: FormState = {
  num: "",
  name: "",
  name_en: "",
  region: "",
  image_url: "",
  items: "",
  note: "",
  sort_order: 10,
};

export default function AdminProducersPage() {
  const { data: producers = [], isLoading } = useProducers();
  const upsert = useUpsertProducer();
  const del = useDeleteProducer();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<FormState>(empty);
  const [deleteTarget, setDeleteTarget] = useState<Producer | null>(null);

  const openNew = () => {
    setForm({ ...empty, sort_order: (producers.at(-1)?.sort_order ?? 0) + 10 });
    setDialogOpen(true);
  };

  const openEdit = (p: Producer) => {
    setForm({
      id: p.id,
      num: p.num,
      name: p.name,
      name_en: p.name_en,
      region: p.region,
      image_url: p.image_url ?? "",
      items: p.items.join(", "),
      note: p.note ?? "",
      sort_order: p.sort_order,
    });
    setDialogOpen(true);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await upsert.mutateAsync({
        id: form.id,
        num: form.num,
        name: form.name,
        name_en: form.name_en,
        region: form.region,
        image_url: form.image_url || null,
        items: form.items
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        note: form.note || null,
        sort_order: Number(form.sort_order) || 0,
      });
      toast.success(form.id ? "更新しました" : "生産者を追加しました");
      setDialogOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "保存に失敗しました");
    }
  };

  const onConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await del.mutateAsync(deleteTarget.id);
      toast.success("削除しました");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "削除に失敗しました");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium mb-2">Producers</div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">
            生産者<span className="italic font-normal text-primary">管理</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            公開サイトの「生産者紹介」ページで表示される生産者を管理します。
          </p>
        </div>
        <Button onClick={openNew} className="bg-foreground text-primary-foreground hover:bg-primary rounded-none h-11 tracking-[0.15em] uppercase text-xs">
          <Plus className="h-4 w-4 mr-2" />
          新規追加
        </Button>
      </div>

      <div className="bg-background border border-border overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr className="text-left">
              <th className="p-3 md:p-4 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium w-16">No.</th>
              <th className="p-3 md:p-4 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">氏名</th>
              <th className="p-3 md:p-4 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">地域</th>
              <th className="p-3 md:p-4 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">品目</th>
              <th className="p-3 md:p-4 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium w-16">Order</th>
              <th className="p-3 md:p-4 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium w-24 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="p-10 text-center text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                  読み込み中…
                </td>
              </tr>
            )}
            {!isLoading && producers.length === 0 && (
              <tr>
                <td colSpan={6} className="p-10 text-center text-muted-foreground text-sm">
                  生産者はまだ登録されていません。
                </td>
              </tr>
            )}
            {producers.map((p) => (
              <tr key={p.id} className="border-b border-border hover:bg-secondary/40 transition-colors">
                <td className="p-3 md:p-4 font-serif italic text-muted-foreground">{p.num}</td>
                <td className="p-3 md:p-4">
                  <div className="font-serif font-bold">{p.name}</div>
                  <div className="text-[11px] text-muted-foreground">{p.name_en}</div>
                </td>
                <td className="p-3 md:p-4 text-muted-foreground">{p.region}</td>
                <td className="p-3 md:p-4 text-muted-foreground">{p.items.join(", ")}</td>
                <td className="p-3 md:p-4 text-muted-foreground tabular-nums">{p.sort_order}</td>
                <td className="p-3 md:p-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openEdit(p)}
                      aria-label="編集"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => setDeleteTarget(p)}
                      aria-label="削除"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit / create dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {form.id ? "生産者を編集" : "生産者を追加"}
            </DialogTitle>
            <DialogDescription>
              公開サイトに表示される情報を入力してください。
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="num">番号 (No.)</Label>
                <Input
                  id="num"
                  value={form.num}
                  onChange={(e) => setForm({ ...form, num: e.target.value })}
                  placeholder="04"
                  required
                  className="mt-1.5 rounded-none"
                />
              </div>
              <div>
                <Label htmlFor="sort_order">表示順</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                  required
                  className="mt-1.5 rounded-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">氏名 (日本語)</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="田中 健一"
                  required
                  className="mt-1.5 rounded-none"
                />
              </div>
              <div>
                <Label htmlFor="name_en">氏名 (English)</Label>
                <Input
                  id="name_en"
                  value={form.name_en}
                  onChange={(e) => setForm({ ...form, name_en: e.target.value })}
                  placeholder="Kenichi Tanaka"
                  required
                  className="mt-1.5 rounded-none"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="region">地域</Label>
              <Input
                id="region"
                value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
                placeholder="茨城県"
                required
                className="mt-1.5 rounded-none"
              />
            </div>

            <div>
              <Label htmlFor="image_url">画像URL</Label>
              <Input
                id="image_url"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                placeholder="https://…/producer.jpg"
                className="mt-1.5 rounded-none"
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                未入力の場合はデフォルト画像が使用されます。
              </p>
            </div>

            <div>
              <Label htmlFor="items">取扱品目 (カンマ区切り)</Label>
              <Input
                id="items"
                value={form.items}
                onChange={(e) => setForm({ ...form, items: e.target.value })}
                placeholder="小松菜, ほうれん草, 水菜"
                className="mt-1.5 rounded-none"
              />
            </div>

            <div>
              <Label htmlFor="note">紹介文</Label>
              <Textarea
                id="note"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                rows={3}
                placeholder="土づくりからこだわった、葉物野菜の名手。"
                className="mt-1.5 rounded-none"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="rounded-none"
                onClick={() => setDialogOpen(false)}
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                disabled={upsert.isPending}
                className="bg-foreground text-primary-foreground hover:bg-primary rounded-none"
              >
                {upsert.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {form.id ? "更新する" : "追加する"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>この生産者を削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              「{deleteTarget?.name}」を削除します。この操作は取り消せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-none">キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-none"
            >
              削除する
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
