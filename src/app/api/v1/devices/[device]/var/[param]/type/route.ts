import { NextRequest } from 'next/server'
import { DEVICE } from '@/common/types'
import { handleVariableOperation } from '@/app/api/utils'

type Params = {
  device: string
  param: keyof DEVICE
}

/**
 * Retrieves type for a specific var.
 *
 * @swagger
 * /api/v1/devices/{device}/var/{param}/type:
 *   get:
 *     summary: Retrieve var type
 *     parameters:
 *       - in: path
 *         name: device
 *         required: true
 *         description: The ID of the device
 *         schema:
 *           type: string
 *       - in: path
 *         name: param
 *         required: true
 *         description: The key of the param
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with var type
 *       '404':
 *         description: Var not found
 *     tags:
 *       - Vars
 */
export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {
  const { device, param } = await params
  return handleVariableOperation(device, param, async (nut) => {
    return await nut.getType(param, device)
  })
}
