"use client";

import Loading from "@/components/Loading";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const LoginPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const loadImage = ()=> {
      const image = new Image();
      image.src = "https://picsum.photos/1920/1080";
      image.onload = ()=> {
        setImageLoaded(true);
      };
    };
  
    loadImage();
  }, [])
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/");
  };

  return (
    <Suspense fallback={<Loading />}>
      {
        imageLoaded ? (
          <div className="flex justify-center h-screen bg-[url('https://picsum.photos/1920/1080')]">
      <div className="mt-24 h-1/2 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-8" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">Inicia sesión en la plataforma</h5>
            <div>
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu email</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                  placeholder="name@company.com" 
                  required 
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu contraseña</label>
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="••••••••" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                  required 
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            
            <button 
              type="submit" 
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Ingrese a su cuenta
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              No estás registrado? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Crear cuenta</a>
            </div>
        </form>

      {errors.length > 0 && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold">Error</p>
            <ul className="mb-0">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
          </div>
        ): (
          <Loading/>
        )
      }
      
    </Suspense>
    
    
  );
};
export default LoginPage;
