import { Session, User, UserRole } from '@prisma/client';

import { UserType } from '@libs/shared';
import { compare } from '@libs/crypt';
import { db } from '@libs/database';
import { v4ID } from '@libs/utility';

export const login = async (data: UserType, user: User & { roles?: UserRole[] }) => {
  const { userId, password } = user;
  if (!user.deleted && (await compare(data.password, password))) {
    const session = await createSession(userId);
    if (session) {
      return session;
      // return {
      //   user: {
      //     ...user,
      //     roles: user.roles?.map((role) => role.roleId),
      //   },
      //   session: session,
      // };
    }
  }
  return null;
};

const createSession = async (userId: string) => {
  return db.session.create({
    data: {
      sessionId: v4ID(),
      userId,
      // NOTE: 30 days from creation
      // expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
      // NOTE: 15 minutes from creation
      expires: new Date(new Date().getTime() + 1000 * 60 * 15),
    },
  });
};

export const getSession = async (sessionId: string, { include }: { include?: Record<string, boolean> } = {}) => {
  return db.session.findUnique({
    where: {
      sessionId,
    },
    include,
  });
};

export const revokeSession = async (session: Session) => {
  if (!session.revokedAt)
    db.session.update({ where: { sessionId: session.sessionId }, data: { revokedAt: new Date() } });
};

export const deferSession = async (session: Session) => {
  if (!session.revokedAt)
    db.session.update({
      where: { sessionId: session.sessionId },
      data: { expires: new Date(new Date().getTime() + 1000 * 60 * 15) },
    });
};

export const isSessionExpired = async (session: Session) => {
  return session.created > session.expires && !session.revokedAt;
};
