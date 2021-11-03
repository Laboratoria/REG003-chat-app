import type { NextApiResponse } from 'next';
import prisma from '../lib/prisma';
import err from '../middlewares/error';
import { Next } from '../types/custom';


export const joinChannel = async (req: Next.Custom, res: NextApiResponse) => {
  try {
    const { id, channelId } = req.query;

    if (!channelId || !id) {
      return err(400, req, res);
    }
    const channelUser = await prisma.channelUser.create({
      data: {
        userId: Number(id),
        channelId: Number(channelId)
      }
    }
    )
    return res.status(200).json({ channelUser })
  } catch (error: any) {
    if (error.code = 'P2002') {
      return err(400, req, res)
    }
    else if (error.code = 'P2003') {
      return err(404, req, res)
    } else {
      return err(500, req, res)
    }
  }
}
export const deleteUserChannel = async (req: Next.Custom, res: NextApiResponse) => {
  try {
    const { id, channelId } = req.query;

    if (!channelId || !id) {
      return err(400, req, res);
    }
    const channelUser = await prisma.channelUser.delete({
      where: {
        userId_channelId: {
          userId: Number(id),
          channelId: Number(channelId)
        }
      }
    })
    return res.status(200).json({ channelUser })
  } catch (error: any) {
    if (error.code = 'P2002') {
      return err(400, req, res)
    }
    else if (error.code = 'P2003') {
      return err(404, req, res)
    } else {
      return err(500, req, res)
    }
  }
}