import { NextRequest, NextResponse } from 'next/server'
import { getDeviceVariablesData, deviceNotFoundError } from '@/app/api/utils'

/**
 * Retrieves data for a specific device.
 *
 * @swagger
 * /api/v1/devices/{device}:
 *   get:
 *     summary: Retrieve device data
 *     parameters:
 *       - in: path
 *         name: device
 *         required: true
 *         description: The ID of the device
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with device data
 *       '404':
 *         description: Device not found
 *     tags:
 *       - Devices
 */

export async function GET(request: NextRequest, { params }: { params: Promise<{ device: string }> }) {
  const { device } = await params
  try {
    const varsValues = await getDeviceVariablesData(device)
    return NextResponse.json(varsValues)
  } catch {
    return deviceNotFoundError()
  }
}
