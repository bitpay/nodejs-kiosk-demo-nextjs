import { invoiceService } from "@/services/invoice";
import logger from "@/utils/logger";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const data = await invoiceService.createInvoice(body);
    logger.info({
      code: "INVOICE_CREATE_SUCCESS",
      message: "Successfully created invoice",
      context: {
        id: data.bitpay_id,
      },
    });

    return NextResponse.json(data);
  } catch (e) {
    logger.error({
      code: "INVOICE_CREATE_FAIL",
      message: "Faoled to create invoice",
      context: {
        errorMessage: e instanceof Error ? e.message : "Unknown error.",
        stackTrace: e,
      },
    });

    return NextResponse.json(e, { status: 500 });
  }
}
