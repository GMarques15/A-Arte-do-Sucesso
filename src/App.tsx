import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react';

interface PixelResult {
  facebook: {
    found: boolean;
    pixelId?: string;
    details: string[];
  };
  utimify: {
    found: boolean;
    details: string[];
  };
}

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PixelResult | null>(null);
  const [error, setError] = useState('');

  const checkPixels = async () => {
    if (!url) {
      setError('Por favor, insira uma URL válida');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Simular verificação de pixels (em um ambiente real, você precisaria de um proxy/backend)
      // Por limitações de CORS, vamos mostrar como seria a verificação
      
      const mockResult: PixelResult = {
        facebook: {
          found: false,
          details: ['Verificação simulada - Use as ferramentas do navegador para verificação real']
        },
        utimify: {
          found: false,
          details: ['Verificação simulada - Use as ferramentas do navegador para verificação real']
        }
      };

      // Simular delay de requisição
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResult(mockResult);
    } catch (err) {
      setError('Erro ao verificar a URL. Verifique se a URL está correta.');
    } finally {
      setLoading(false);
    }
  };

  const formatUrl = (inputUrl: string) => {
    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
      return `https://${inputUrl}`;
    }
    return inputUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Verificador de Pixels
            </h1>
            <p className="text-lg text-gray-600">
              Verifique se os pixels do Facebook e Utimify estão instalados no seu site
            </p>
          </div>

          {/* URL Input */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                  URL do Site
                </label>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://exemplo.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={checkPixels}
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  {loading ? 'Verificando...' : 'Verificar'}
                </button>
              </div>
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Manual Instructions */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-blue-600" />
              Como Verificar Manualmente
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Pixel do Facebook</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>1. Abra o site e pressione F12</strong>
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>2. Vá para a aba "Console"</strong>
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>3. Digite:</strong>
                  </p>
                  <code className="block bg-gray-800 text-green-400 p-2 rounded text-xs">
                    fbq('track', 'PageView')
                  </code>
                  <p className="text-sm text-gray-700 mt-2">
                    Se retornar sem erro, o pixel está instalado.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Ou procure por:</strong>
                  </p>
                  <ul className="text-xs text-blue-700 mt-1 space-y-1">
                    <li>• connect.facebook.net/en_US/fbevents.js</li>
                    <li>• fbq('init', 'SEU_PIXEL_ID')</li>
                    <li>• Facebook Pixel Helper (extensão do Chrome)</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Pixel do Utimify</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>1. Abra o código fonte (Ctrl+U)</strong>
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>2. Procure por:</strong>
                  </p>
                  <code className="block bg-gray-800 text-green-400 p-2 rounded text-xs">
                    utimify
                  </code>
                  <p className="text-sm text-gray-700 mt-2">
                    <strong>Ou no DevTools (F12):</strong>
                  </p>
                  <code className="block bg-gray-800 text-green-400 p-2 rounded text-xs">
                    window.utimify
                  </code>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-800">
                    <strong>Scripts típicos do Utimify:</strong>
                  </p>
                  <ul className="text-xs text-purple-700 mt-1 space-y-1">
                    <li>• utimify.com.br/js/</li>
                    <li>• Funções utimify no console</li>
                    <li>• Tags de conversão específicas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Tools Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ExternalLink className="w-6 h-6 text-green-600" />
              Ferramentas Úteis
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Facebook Pixel Helper</h3>
                <p className="text-sm text-blue-700 mb-3">
                  Extensão oficial do Facebook para Chrome
                </p>
                <a 
                  href="https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Instalar →
                </a>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Tag Assistant</h3>
                <p className="text-sm text-green-700 mb-3">
                  Ferramenta do Google para verificar tags
                </p>
                <a 
                  href="https://tagassistant.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  Acessar →
                </a>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">DevTools</h3>
                <p className="text-sm text-purple-700 mb-3">
                  Ferramentas nativas do navegador (F12)
                </p>
                <span className="text-purple-600 text-sm font-medium">
                  Sempre disponível
                </span>
              </div>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Resultados da Verificação</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    {result.facebook.found ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                    <h3 className="text-lg font-semibold">Pixel do Facebook</h3>
                  </div>
                  
                  {result.facebook.pixelId && (
                    <p className="text-sm text-gray-600 mb-2">
                      ID do Pixel: <code className="bg-gray-100 px-2 py-1 rounded">{result.facebook.pixelId}</code>
                    </p>
                  )}
                  
                  <ul className="text-sm text-gray-700 space-y-1">
                    {result.facebook.details.map((detail, index) => (
                      <li key={index}>• {detail}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    {result.utimify.found ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                    <h3 className="text-lg font-semibold">Pixel do Utimify</h3>
                  </div>
                  
                  <ul className="text-sm text-gray-700 space-y-1">
                    {result.utimify.details.map((detail, index) => (
                      <li key={index}>• {detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;