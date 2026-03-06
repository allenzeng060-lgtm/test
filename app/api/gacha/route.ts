import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  // TODO: 取得所有扭蛋機列表
  return NextResponse.json({ machines: [] });
}

export async function POST(request: NextRequest) {
  try {
    const { machineId, count = 1 } = await request.json();

    if (!machineId) {
      return NextResponse.json({ error: "machineId is required" }, { status: 400 });
    }

    // TODO: 完整實作：
    // 1. 驗證用戶登入
    // 2. 取得扭蛋機與商品池
    // 3. 驗證餘額
    // 4. 加權隨機抽取（考慮保底機制）
    // 5. 建立 GachaResult 記錄
    // 6. 扣除錢包餘額（WalletTransaction）
    // 7. 建立訂單
    // 8. 回傳結果
    //
    // 核心抽取邏輯：
    // async function drawFromMachine(machine, userId, count) {
    //   const results = [];
    //   for (let i = 0; i < count; i++) {
    //     const poolItems = machine.poolItems;
    //     const totalWeight = poolItems.reduce((sum, item) => sum + item.weight, 0);
    //     let random = Math.random() * totalWeight;
    //     for (const item of poolItems) {
    //       random -= item.weight;
    //       if (random <= 0) {
    //         results.push(item);
    //         break;
    //       }
    //     }
    //   }
    //   return results;
    // }

    return NextResponse.json({ results: [], orderId: null });
  } catch {
    return NextResponse.json({ error: "Failed to draw" }, { status: 500 });
  }
}
