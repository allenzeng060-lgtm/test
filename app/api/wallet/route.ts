import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // TODO: 取得當前登入用戶的錢包資訊
  // const session = await getServerSession();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // const user = await prisma.user.findUnique({
  //   where: { id: session.user.id },
  //   select: { walletBalance: true },
  // });
  // const transactions = await prisma.walletTransaction.findMany({
  //   where: { userId: session.user.id },
  //   orderBy: { createdAt: "desc" },
  //   take: 20,
  // });

  return NextResponse.json({ balance: 0, transactions: [] });
}
