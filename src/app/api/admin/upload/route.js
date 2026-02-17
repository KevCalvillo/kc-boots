import { supabaseAdmin } from "@/libs/supabase";
import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó ningún archivo" },
        { status: 400 },
      );
    }

    // Validar que sea una imagen
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "El archivo debe ser una imagen" },
        { status: 400 },
      );
    }

    // Validar tamaño (10MB máximo de entrada, ya que se comprimirá)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "La imagen excede el límite de 10MB" },
        { status: 400 },
      );
    }

    // Convertir a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convertir a WebP con sharp (calidad 80%, excelente balance visual/peso)
    const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();

    // Generar nombre único
    const fileName = `${crypto.randomUUID()}.webp`;

    // Subir a Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from("products")
      .upload(fileName, webpBuffer, {
        contentType: "image/webp",
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return NextResponse.json(
        { error: "Error al subir la imagen" },
        { status: 500 },
      );
    }

    // Obtener URL pública
    const { data: publicData } = supabaseAdmin.storage
      .from("products")
      .getPublicUrl(fileName);

    return NextResponse.json({
      url: publicData.publicUrl,
      path: fileName,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Error interno al procesar la imagen" },
      { status: 500 },
    );
  }
}
