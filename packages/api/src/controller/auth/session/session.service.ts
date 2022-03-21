import { Session, User, UserRole } from '@prisma/client';

import { AuthType } from '@libs/shared';
import { compare } from '@libs/crypt';
import { createID } from '@libs/utility';
import { db } from '@libs/database';

export const login = async (data: AuthType, user: User & { roles?: UserRole[] }) => {
  const { id, password } = user;
  if (!user.deleted && (await compare(data.password, password))) {
    console.log(user);
    console.log(id);

    const session = await createSession(id);
    if (session) {
      return session;
    }
  }
  return null;
};

const createSession = async (userId: number) => {
  return db.session.create({
    data: {
      userId,
      sessionId: createID(24),
      // NOTE: 30 days from creation
      // expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
      // NOTE: 15 minutes from creation
      deleted: new Date(new Date().getTime() + 1000 * 60 * 15),
    },
    include: { user: true },
  });
};

export const getSession = async (sessionToken: string, { include }: { include?: Record<string, boolean> } = {}) => {
  return db.session.findUnique({
    where: {
      sessionId: sessionToken,
    },
    include,
  });
};

export const revokeSession = async (session: Session) => {
  if (!session.deleted) db.session.update({ where: { sessionId: session.sessionId }, data: { deleted: new Date() } });
};

export const isSessionExpired = async (session: Session) => {
  return session.deleted ? session.created > session.deleted : true;
};

export const refreshSession = async (session: Session) => {
  if (!(await isSessionExpired(session))) {
    return db.session.update({
      where: { sessionId: session.sessionId },
      data: { deleted: new Date(new Date().getTime() + 1000 * 60 * 15) },
      include: { user: true },
    });
  }
};
