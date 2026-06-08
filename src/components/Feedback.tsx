import { AlertTriangle, RefreshCw } from "lucide-react";

interface LoadingProps {
  text?: string;
}

export function LoadingSpinner({ text = "Carregando dados..." }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <RefreshCw size={32} className="text-[#1da2d8] animate-spin" />
      <p className="text-sm text-[#76b6c4]">{text}</p>
    </div>
  );
}

export function ErrorBox({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl">
      <AlertTriangle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-red-700">
          Erro ao carregar dados
        </p>
        <p className="text-xs text-red-600 mt-1 opacity-80">{message}</p>
        <p className="text-xs text-red-500 mt-1 opacity-60">
          Problemas internos de servidor
        </p>
      </div>
    </div>
  );
}

export function EmptyBox({
  text = "Nenhum dado encontrado.",
}: {
  text?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-[#76b6c4]">
      <span className="text-4xl">🌊</span>
      <p className="text-sm">{text}</p>
    </div>
  );
}
