import { AlertTriangle, RefreshCw, WifiOff, Waves } from "lucide-react";

interface LoadingProps {
  text?: string;
}

export function LoadingSpinner({ text = "Carregando dados..." }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-[#def3f6] border-t-[#1da2d8] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Waves size={18} className="text-[#1da2d8]" />
        </div>
      </div>
      <p className="text-sm text-[#76b6c4] animate-pulse">{text}</p>
    </div>
  );
}

export function ErrorBox({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  const isTimeout =
    message.toLowerCase().includes("esgotado") ||
    message.toLowerCase().includes("timeout");

  return (
    <div className="flex flex-col gap-3 p-5 bg-red-50 border-l-4 border-red-500 rounded-xl animate-fade-in-up">
      <div className="flex items-start gap-3">
        {isTimeout ? (
          <WifiOff size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle
            size={20}
            className="text-red-500 flex-shrink-0 mt-0.5"
          />
        )}
        <div>
          <p className="text-sm font-semibold text-red-700">
            {isTimeout
              ? "Conexão com o servidor esgotada"
              : "Erro ao carregar dados"}
          </p>
          <p className="text-xs text-red-600 mt-1 opacity-80">{message}</p>
          <p className="text-xs text-red-500 mt-1 opacity-60">
            Servidor: deepscan.labs-lcs-server.com
          </p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="self-start flex items-center gap-2 text-xs font-semibold text-red-600 hover:text-red-800 transition-colors bg-red-100 hover:bg-red-200 px-3 py-1.5 rounded-lg"
        >
          <RefreshCw size={13} />
          Tentar novamente
        </button>
      )}
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
      <span className="text-4xl animate-float">🌊</span>
      <p className="text-sm">{text}</p>
    </div>
  );
}
