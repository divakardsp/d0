import { onBoardUser } from "@/features/auth/actions";
import { auth } from "@clerk/nextjs/server";

export default async function RootGroupLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await auth.protect()
    await onBoardUser();

    return children;
}
