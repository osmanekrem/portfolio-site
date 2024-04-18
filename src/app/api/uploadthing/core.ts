import { auth } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();

const handleAuth = async () => {
    const user = await auth();
    if(!user?.user) throw new Error("Unauthorized!")
    return {user}
}
 
export const ourFileRouter = {
    projectImage: f({image: {maxFileSize:"4MB", maxFileCount:1}})
        .middleware(() => handleAuth())
        .onUploadComplete(() => {})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;