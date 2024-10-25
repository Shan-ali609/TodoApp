import connect from "@/lib/mongodb";
import { TaskModel } from "@/models/schema";
import { NextResponse } from "next/server";

export async function PUT(request, content) {
  const productid = content.params.productid;
  const filter = { _id: productid };
  const payload = await request.json();
  console.log(payload);
  await connect();

  const result = await TaskModel.findOneAndUpdate(filter, payload);
  return NextResponse.json({ result, success: true });
}

export async function GET(request, content) {
  const productid = content.params.productid;
  const record = { _id: productid };
  await connect();

  const result = await TaskModel.findOneAndUpdate(record);
  return NextResponse.json({ result, success: true });
}
