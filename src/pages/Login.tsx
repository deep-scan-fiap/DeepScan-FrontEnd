import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link } from "react-router";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#064273] via-[#1da2d8] to-[#7fcdff] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
          <h2 className="text-3xl font-bold text-[#064273] text-center mb-2">
            Bem-vindo
          </h2>
          <p className="text-[#76b6c4] text-center mb-8">
            Acesse sua conta para implementar novos dados
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-[#064273] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#76b6c4]"
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-12 pr-4 py-3 bg-[#def3f6] border-2 border-transparent rounded-lg focus:border-[#1da2d8] focus:outline-none text-[#064273] placeholder:text-[#76b6c4]"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-[#064273] mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#76b6c4]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-[#def3f6] border-2 border-transparent rounded-lg focus:border-[#1da2d8] focus:outline-none text-[#064273] placeholder:text-[#76b6c4]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#76b6c4] hover:text-[#1da2d8] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1da2d8] hover:bg-[#064273] text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Entrar
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#def3f6]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#76b6c4]">ou</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-[#76b6c4]">
            Não tem uma conta?{" "}
            <a
              href="#"
              className="text-[#1da2d8] hover:text-[#064273] font-semibold transition-colors"
            >
              Cadastre-se
            </a>
          </p>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-[#76b6c4] hover:text-[#1da2d8] transition-colors"
            >
              ← Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
