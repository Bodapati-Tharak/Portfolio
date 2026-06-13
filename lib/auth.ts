import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/admin/login',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
          throw new Error('Admin credentials not configured');
        }

        if (credentials.email !== adminEmail) {
          throw new Error('Invalid credentials');
        }

        // For production, ADMIN_PASSWORD should be a bcrypt hash
        // For development, we compare directly and auto-hash
        let passwordValid = false;
        
        if (adminPassword.startsWith('$2b$') || adminPassword.startsWith('$2a$')) {
          // Password is already hashed
          passwordValid = await bcrypt.compare(credentials.password, adminPassword);
        } else {
          // Plain text comparison (not recommended for production)
          passwordValid = credentials.password === adminPassword;
        }

        if (!passwordValid) {
          throw new Error('Invalid credentials');
        }

        return {
          id: 'admin',
          email: adminEmail,
          name: 'Portfolio Admin',
          role: 'ADMIN',
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
