import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") ?? "";
  const team = searchParams.get("team") ?? "";
  const rarity = searchParams.get("rarity") ?? "";
  const sort = searchParams.get("sort") ?? "newest";
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");

  try {
    // TODO: 當 Prisma 生成完畢後，替換為真實 DB 查詢
    // const where: Prisma.ProductWhereInput = {
    //   isActive: true,
    //   ...(search && {
    //     OR: [
    //       { playerName: { contains: search, mode: "insensitive" } },
    //       { name: { contains: search, mode: "insensitive" } },
    //     ],
    //   }),
    //   ...(team && { team }),
    //   ...(rarity && rarity !== "ALL" && { rarity: rarity as Rarity }),
    // };
    // const [products, total] = await Promise.all([
    //   prisma.product.findMany({ where, skip: (page - 1) * limit, take: limit }),
    //   prisma.product.count({ where }),
    // ]);

    return NextResponse.json({ products: [], total: 0, page, limit });
  } catch {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
