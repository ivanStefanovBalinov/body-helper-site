import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import connectDB from "../../../../../db/connectdb";
import User from "../../../../../db/models/User.Schema";

//TEST EMAIL: john@email.com
//Password: 123456

//I create this variable "fetchedUser" because it is the only way i found to paste data from
//authorize function to callbacks function.
let fetchedUser = false;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GCP_CLIENT_ID,
      clientSecret: process.env.GCP_SECRET,
    }),
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email...",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password...",
        },
      },
      async authorize(credentials, req) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );
        if (!user) {
          return null;
        }

        const isMatch = await user.comparePassword(credentials.password);

        if (!isMatch) {
          throw new Error("Invalid credentials");
        }

        fetchedUser = user;
        return user;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // session.accessToken = token.accessToken;
      session.user.userId = fetchedUser._id;
      session.user.isAdmin = fetchedUser.isAdmin;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
