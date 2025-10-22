// "use client";
// import React, { useEffect, useState } from "react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import Axios from "@/lib/Axios";
// import { toast } from "sonner";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Card } from "@/components/ui/card";

// const formSchema = z
//   .object({
//     password: z
//       .string({ message: "Password is required" })
//       .min(8, { message: "Password must at least 8 characters" })
//       .regex(/[A-z]/, "Password at leat One Uppercase")
//       .regex(/[a-z]/, "Password at least one lowercase")
//       .regex(/[0-9]/, "Password at least one number")
//       .regex(/[@#$%^&*]/, "Password at least one special character"),
//     confirmPassword: z.string({ message: "Confirm password is required" }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Password and confirm password must be same",
//     path: ["confirmPassword"],
//   });
// export const dynamic = "force-dynamic";
// const ResetPassword = () => {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//   });
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const resetPasswordToken = searchParams.get("token");
//   const [isValidTokenLoading, setIsValidTokenLoading] = useState(true);
//   const [isExpiredToken, setIsExpiredToken] = useState(true);
//   const [userId, setUserId] = useState("");

//   const verifyResetPasswordToken = async () => {
//     const payload = {
//       token: resetPasswordToken,
//     };
//     try {
//       setIsValidTokenLoading(true);
//       const response = await Axios.post(
//         "/api/auth/verify-forgot-password-token",
//         payload
//       );

//       if (response.status === 200) {
//         setUserId(response?.data?.userId);
//         setIsExpiredToken(response?.data?.expired);
//       }
//     } catch (error: any) {
//       toast.error(error?.response?.data?.error);
//     } finally {
//       setIsValidTokenLoading(false);
//     }
//   };

//   //very the token
//   useEffect(() => {
//     if (resetPasswordToken) {
//       verifyResetPasswordToken();
//     } else {
//       router.push("/forgot-password");
//     }
//   }, []);

//   // 2. Define a submit handler.
//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values);

//     const payload = {
//       userId: userId,
//       password: values.password,
//     };

//     try {
//       setIsLoading(true);
//       const response = await Axios.post("/api/auth/reset-password", payload);

//       if (response.status === 200) {
//         toast.success(response.data.message);
//         form.reset();
//         router.push("/login");
//       }
//     } catch (error: any) {
//       toast.error(error?.response?.data?.error);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="lg:p-10 space-y-7">
//       <h1 className="text-xl font-semibold text-center">Reset Password</h1>
//       {isValidTokenLoading ? (
//         <Card>
//           <p className="mx-auto w-fit">Loading...</p>
//         </Card>
//       ) : isExpiredToken ? (
//         <Card>
//           <p className="mx-auto w-fit">Link is expired...</p>
//         </Card>
//       ) : (
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-4 max-w-md mx-auto"
//           >
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Enter your password"
//                       {...field}
//                       disabled={isLoading}
//                       type="password"
//                       value={field.value ?? ""}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="confirmPassword"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Confirm Password</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Enter your confirm password"
//                       {...field}
//                       disabled={isLoading}
//                       type="password"
//                       value={field.value ?? ""}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button
//               disabled={isLoading}
//               type="submit"
//               className="w-full cursor-pointer"
//             >
//               {isLoading ? "Loading..." : "Reset Password"}
//             </Button>
//           </form>
//         </Form>
//       )}

//       <div className="max-w-md mx-auto">
//         <p>
//           Already have account ?{" "}
//           <Link href={"/login"} className="text-primary drop-shadow-md">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

import React, { Suspense } from "react";
import ResetPasswordClient from "@/components/ResetPasswordClient"; // Hum yeh nayi file banayenge
import Logo from "@/components/Logo"; // Maan lete hain aapke paas Logo component hai

// Yeh ek Server Component hai
const ResetPasswordPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Reset Your Password
          </h2>
          {/* FIX: Hum Suspense boundary ka istemal kar rahe hain.
            Jab tak client component load nahi hota, yeh fallback dikhayega.
          */}
          <Suspense fallback={<LoadingSpinner />}>
            <ResetPasswordClient />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

// Ek simple loading component
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default ResetPasswordPage;
