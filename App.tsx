import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { User, Wallet, Transaction, WalletType, TransactionType } from './types';
import { INITIAL_WALLETS, INITIAL_TRANSACTIONS } from './services/mockData';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { 
  ArrowRight, 
  Smartphone, 
  ShieldCheck, 
  Camera, 
  CheckCircle, 
  CreditCard, 
  ArrowLeftRight, 
  TrendingUp, 
  Store,
  Wallet as WalletIcon,
  LogOut,
  Info
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

// --- Screens ---

const WelcomeScreen = ({ onStart }: { onStart: () => void }) => (
  <div className="h-full flex flex-col items-center justify-between p-8 bg-white min-h-screen">
    <div className="flex-1 flex flex-col items-center justify-center space-y-8 w-full">
      <div className="relative">
        <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="bg-white p-6 rounded-3xl shadow-xl relative z-10 border border-gray-100">
          <div className="flex space-x-2">
            <div className="w-8 h-8 rounded-full bg-mixx"></div>
            <div className="w-8 h-8 rounded-full bg-flooz"></div>
          </div>
        </div>
      </div>
      
      <div className="text-center space-y-4 max-w-xs">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Convergence</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          La première plateforme unifiée pour <span className="text-mixx font-semibold">Mixx</span> et <span className="text-flooz font-semibold">Flooz</span>. Gérez tous vos comptes Mobile Money au même endroit.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mt-8">
        <div className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center text-center space-y-2 border border-gray-100">
          <ShieldCheck className="text-primary" size={24} />
          <span className="text-xs font-medium text-gray-600">Sécurisé & Conforme</span>
        </div>
        <div className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center text-center space-y-2 border border-gray-100">
          <ArrowLeftRight className="text-primary" size={24} />
          <span className="text-xs font-medium text-gray-600">Interopérable</span>
        </div>
      </div>
    </div>
    
    <div className="w-full space-y-4">
      <Button fullWidth onClick={onStart} className="text-lg shadow-xl shadow-primary/20">
        Commencer
      </Button>
      <p className="text-xs text-center text-gray-400">Version MVP - Sprint 1</p>
    </div>
  </div>
);

const RegisterScreen = ({ onComplete }: { onComplete: (user: User) => void }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  // Simulation of OCR scanning
  const handleScan = () => {
    setIsScanning(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setStep(3), 500);
      }
    }, 50);
  };

  const handleFinish = () => {
    onComplete({
      name: 'Utilisateur Test',
      phone: phone,
      kycVerified: true,
      pinSet: true
    });
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <div className="flex-1">
        {/* Progress Stepper */}
        <div className="flex items-center space-x-4 mb-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= i ? 'bg-primary' : 'bg-gray-100'}`} />
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {step === 1 && "Identification"}
          {step === 2 && "Vérification KYC"}
          {step === 3 && "Sécurité"}
        </h2>
        <p className="text-gray-500 mb-8 text-sm">
          {step === 1 && "Entrez votre numéro de téléphone pour commencer."}
          {step === 2 && "Scannez votre pièce d'identité pour valider votre compte."}
          {step === 3 && "Définissez votre code PIN pour sécuriser vos transactions."}
        </p>

        <div className="space-y-6">
          {step === 1 && (
            <>
              <Input 
                label="Numéro de téléphone" 
                placeholder="+225 07..." 
                icon={<Smartphone size={18} />}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button fullWidth onClick={() => setStep(2)} disabled={phone.length < 8}>
                Continuer
              </Button>
            </>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center space-y-6">
              {!isScanning ? (
                <div 
                  onClick={handleScan}
                  className="w-full aspect-video bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors group"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Camera className="text-primary" size={32} />
                  </div>
                  <span className="font-medium text-gray-600">Appuyer pour scanner la CNI</span>
                  <span className="text-xs text-gray-400 mt-2">Recto uniquement</span>
                </div>
              ) : (
                <div className="w-full aspect-video bg-gray-900 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/50 z-10 flex flex-col items-center justify-center text-white">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
                    <span>Analyse du document... {scanProgress}%</span>
                  </div>
                  <img src="https://picsum.photos/800/450" className="opacity-50 object-cover w-full h-full" alt="Scan simulation" />
                </div>
              )}
              
              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 flex items-start space-x-3 w-full">
                <ShieldCheck className="text-yellow-600 flex-shrink-0" size={20} />
                <p className="text-xs text-yellow-800 leading-relaxed">
                  Conformément aux directives de la BCEAO, l'identification est obligatoire pour accéder aux services financiers.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex justify-center space-x-4 mb-8">
                 {[1, 2, 3, 4].map(i => (
                   <div key={i} className="w-4 h-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 100}ms` }}></div>
                 ))}
              </div>
              <Input 
                label="Code PIN (4 chiffres)" 
                type="password"
                placeholder="••••" 
                className="text-center tracking-[1em] font-bold text-lg"
                maxLength={4}
              />
              <Input 
                label="Confirmer le PIN" 
                type="password"
                placeholder="••••" 
                className="text-center tracking-[1em] font-bold text-lg"
                maxLength={4}
              />
              <Button fullWidth onClick={handleFinish} className="mt-8">
                Terminer l'inscription
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DashboardScreen = ({ 
  user, 
  wallets, 
  transactions,
  onNavigate 
}: { 
  user: User, 
  wallets: Record<WalletType, Wallet>, 
  transactions: Transaction[],
  onNavigate: (tab: any) => void
}) => {
  const totalBalance = wallets[WalletType.MIXX].balance + wallets[WalletType.FLOOZ].balance;
  
  // Data for the mini chart
  const data = [
    { name: 'Lun', uv: 4000 },
    { name: 'Mar', uv: 3000 },
    { name: 'Mer', uv: 2000 },
    { name: 'Jeu', uv: 2780 },
    { name: 'Ven', uv: 1890 },
    { name: 'Sam', uv: 2390 },
    { name: 'Dim', uv: 3490 },
  ];

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bonjour, Utilisateur</h1>
          <p className="text-xs text-gray-500">Bienvenue sur votre espace unifié</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center text-gray-500 font-bold">
          U
        </div>
      </header>

      {/* Total Balance Card */}
      <div className="bg-gradient-to-br from-primary to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div className="relative z-10">
          <p className="text-indigo-200 text-sm font-medium mb-1">Solde Total Unifié</p>
          <h2 className="text-4xl font-bold mb-6">{totalBalance.toLocaleString()} <span className="text-lg font-normal opacity-80">FCFA</span></h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-mixx"></div>
                <span className="text-xs text-indigo-100">Mixx</span>
              </div>
              <p className="font-semibold">{wallets[WalletType.MIXX].balance.toLocaleString()}</p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-flooz"></div>
                <span className="text-xs text-indigo-100">Flooz</span>
              </div>
              <p className="font-semibold">{wallets[WalletType.FLOOZ].balance.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: <ArrowLeftRight size={20} />, label: "Transfert", action: () => onNavigate('transfer'), color: "bg-blue-100 text-blue-600" },
          { icon: <Store size={20} />, label: "Marchand", action: () => onNavigate('scan'), color: "bg-orange-100 text-orange-600" },
          { icon: <WalletIcon size={20} />, label: "Recharge", action: () => {}, color: "bg-green-100 text-green-600" },
          { icon: <Info size={20} />, label: "Projet", action: () => onNavigate('profile'), color: "bg-purple-100 text-purple-600" },
        ].map((item, idx) => (
          <button key={idx} onClick={item.action} className="flex flex-col items-center space-y-2 group">
            <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center transition-transform group-active:scale-95 shadow-sm`}>
              {item.icon}
            </div>
            <span className="text-xs font-medium text-gray-600">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-bold text-gray-900">Activité récente</h3>
          <button onClick={() => onNavigate('history')} className="text-xs text-primary font-medium hover:underline">Voir tout</button>
        </div>
        
        <div className="space-y-3">
          {transactions.slice(0, 3).map(tx => (
            <div key={tx.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === TransactionType.DEPOSIT ? 'bg-green-50 text-green-600' : 
                  tx.type === TransactionType.PAYMENT ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {tx.type === TransactionType.DEPOSIT ? <TrendingUp size={18} /> : 
                   tx.type === TransactionType.PAYMENT ? <Store size={18} /> : <ArrowLeftRight size={18} />}
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-900">{tx.description}</p>
                  <p className="text-xs text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-sm ${tx.type === TransactionType.DEPOSIT ? 'text-green-600' : 'text-gray-900'}`}>
                  {tx.type === TransactionType.DEPOSIT ? '+' : '-'}{tx.amount.toLocaleString()}
                </p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  tx.source === WalletType.MIXX ? 'bg-mixx/10 text-mixx' : 'bg-flooz/10 text-flooz'
                }`}>
                  {tx.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Spending Chart Mini */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Aperçu des dépenses</h3>
        <div className="h-32 w-full">
           <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line type="monotone" dataKey="uv" stroke="#4F46E5" strokeWidth={2} dot={false} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const TransferScreen = ({ 
  wallets, 
  onTransfer 
}: { 
  wallets: Record<WalletType, Wallet>, 
  onTransfer: (amount: number, from: WalletType, to: string) => void 
}) => {
  const [source, setSource] = useState<WalletType>(WalletType.MIXX);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      onTransfer(parseInt(amount), source, recipient);
      setLoading(false);
      setSuccess(true);
      setAmount('');
      setRecipient('');
    }, 1500);
  };

  if (success) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle className="text-green-600" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Transfert réussi !</h2>
        <p className="text-gray-500 mb-8">Votre transfert a été traité avec succès.</p>
        <Button onClick={() => setSuccess(false)}>Effectuer un autre transfert</Button>
      </div>
    );
  }

  return (
    <div className="p-6 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-6">Nouveau Transfert</h2>
      
      <div className="flex-1 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Compte source</label>
          <div className="grid grid-cols-2 gap-3">
            {[WalletType.MIXX, WalletType.FLOOZ].map(type => (
              <button
                key={type}
                onClick={() => setSource(type)}
                className={`p-4 rounded-xl border-2 transition-all ${source === type 
                  ? (type === WalletType.MIXX ? 'border-mixx bg-mixx/5' : 'border-flooz bg-flooz/5') 
                  : 'border-gray-100 bg-white hover:border-gray-200'}`}
              >
                <div className="flex flex-col items-start">
                  <span className={`text-xs font-bold uppercase mb-1 ${type === WalletType.MIXX ? 'text-mixx' : 'text-flooz'}`}>{type}</span>
                  <span className="font-semibold text-gray-900">{wallets[type].balance.toLocaleString()} F</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <Input 
          label="Numéro du bénéficiaire" 
          placeholder="0102030405" 
          type="tel"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          icon={<Smartphone size={18} />}
        />

        <div>
          <Input 
            label="Montant (FCFA)" 
            placeholder="0" 
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-lg font-semibold"
          />
          <div className="flex justify-between mt-2 text-xs text-gray-500 px-1">
            <span>Frais estimés: 1%</span>
            <span>Total: {amount ? (parseInt(amount) * 1.01).toFixed(0) : 0} FCFA</span>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl flex items-start space-x-3">
          <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-xs text-blue-800">
            Grâce à l'interopérabilité Convergence, vous pouvez envoyer de l'argent vers n'importe quel opérateur Mixx ou Flooz sans frais supplémentaires cachés.
          </p>
        </div>
      </div>

      <Button 
        fullWidth 
        onClick={handleSubmit} 
        isLoading={loading}
        disabled={!amount || !recipient}
        className="mt-6"
      >
        Envoyer maintenant
      </Button>
    </div>
  );
};

const ScanScreen = ({ onPay }: { onPay: (amount: number, merchant: string) => void }) => {
  const [step, setStep] = useState<'scan' | 'confirm'>('scan');
  const [merchantData, setMerchantData] = useState<{name: string, amount: number} | null>(null);

  useEffect(() => {
    if (step === 'scan') {
      // Simulate finding a QR code after 3 seconds
      const timer = setTimeout(() => {
        setMerchantData({ name: "Supermarché Bon Prix", amount: 15000 });
        setStep('confirm');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="h-full bg-black relative flex flex-col">
      {step === 'scan' && (
        <>
          <div className="absolute top-0 left-0 w-full p-6 z-10">
            <h2 className="text-white text-lg font-bold drop-shadow-md text-center">Scanner un QR Code</h2>
          </div>
          
          <div className="flex-1 relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              className="w-full h-full object-cover opacity-60"
              alt="Camera feed"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-white/50 rounded-3xl relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary -mt-1 -ml-1 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary -mt-1 -mr-1 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary -mb-1 -ml-1 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary -mb-1 -mr-1 rounded-br-lg"></div>
                <div className="w-full h-1 bg-primary/80 absolute top-1/2 shadow-[0_0_15px_rgba(79,70,229,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-24 w-full px-6 text-center">
            <p className="text-white/80 text-sm bg-black/50 py-2 px-4 rounded-full inline-block backdrop-blur-sm">
              Placez le code QR dans le cadre
            </p>
          </div>
          <style>{`
            @keyframes scan {
              0% { top: 10%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { top: 90%; opacity: 0; }
            }
          `}</style>
        </>
      )}

      {step === 'confirm' && merchantData && (
        <div className="absolute inset-0 bg-gray-100 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 pb-24 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] animation-slide-up">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{merchantData.name}</h3>
              <p className="text-sm text-gray-500">Marchand certifié</p>
            </div>

            <div className="border-t border-b border-gray-100 py-6 mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500">Montant à payer</span>
                <span className="text-xl font-bold text-gray-900">{merchantData.amount.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Frais</span>
                <span className="text-green-600 font-medium">Gratuit</span>
              </div>
            </div>

            <Button fullWidth onClick={() => {
              onPay(merchantData.amount, merchantData.name);
            }}>
              Confirmer le paiement
            </Button>
            <button 
              onClick={() => setStep('scan')} 
              className="w-full mt-4 text-center text-gray-500 text-sm font-medium py-2"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const HistoryScreen = ({ transactions }: { transactions: Transaction[] }) => (
  <div className="p-6">
    <h2 className="text-xl font-bold mb-6">Historique</h2>
    <div className="space-y-4">
      {transactions.map(tx => (
        <div key={tx.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                tx.type === TransactionType.DEPOSIT ? 'bg-green-50 text-green-600' : 
                tx.type === TransactionType.PAYMENT ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
              }`}>
                {tx.type === TransactionType.DEPOSIT ? <TrendingUp size={18} /> : 
                 tx.type === TransactionType.PAYMENT ? <Store size={18} /> : <ArrowLeftRight size={18} />}
              </div>
              <div>
                <p className="font-bold text-gray-900">{tx.description}</p>
                <p className="text-xs text-gray-500">{new Date(tx.date).toLocaleDateString()} • {new Date(tx.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              </div>
            </div>
            <p className={`font-bold ${tx.type === TransactionType.DEPOSIT ? 'text-green-600' : 'text-gray-900'}`}>
              {tx.type === TransactionType.DEPOSIT ? '+' : '-'}{tx.amount.toLocaleString()} F
            </p>
          </div>
          <div className="pt-3 border-t border-gray-50 flex justify-between text-xs">
            <span className="text-gray-400">ID: {tx.id}</span>
            <span className={`px-2 py-0.5 rounded-full ${
              tx.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {tx.status === 'completed' ? 'Succès' : 'En attente'}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AboutScreen = () => (
  <div className="p-6 space-y-6">
    <h2 className="text-xl font-bold">À propos du Projet</h2>
    
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
      <h3 className="font-semibold text-primary">Vision du Projet</h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        Convergence Mixx & Flooz vise à concevoir une plateforme numérique unifiée permettant l'interopérabilité fonctionnelle et technique entre les services Mobile Money, servant de point d'entrée unique pour les utilisateurs.
      </p>
    </div>

    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
      <h3 className="font-semibold text-primary">Équipe Scrum</h3>
      <ul className="space-y-3">
        <li className="flex items-center space-x-3 text-sm text-gray-700">
          <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">PO</span>
          <span>Product Owner: Vision Produit</span>
        </li>
        <li className="flex items-center space-x-3 text-sm text-gray-700">
          <span className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-bold text-xs">SM</span>
          <span>Scrum Master: Facilitateur</span>
        </li>
        <li className="flex items-center space-x-3 text-sm text-gray-700">
          <span className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 font-bold text-xs">DEV</span>
          <span>Team Dev: Frontend/Backend/DevOps</span>
        </li>
      </ul>
    </div>

    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
      <h3 className="font-semibold text-primary">Roadmap</h3>
      <div className="space-y-4 relative pl-4 border-l-2 border-gray-100">
        <div className="relative">
          <div className="absolute -left-[21px] top-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          <p className="text-sm font-bold text-gray-900">Sprint 1</p>
          <p className="text-xs text-gray-500">MVP: Inscription & Sécurité (Terminé)</p>
        </div>
        <div className="relative">
          <div className="absolute -left-[21px] top-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
          <p className="text-sm font-bold text-gray-900">Sprint 2</p>
          <p className="text-xs text-gray-500">Transactions Interopérables (En cours)</p>
        </div>
        <div className="relative">
          <div className="absolute -left-[21px] top-1 w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></div>
          <p className="text-sm font-bold text-gray-900">Sprint 3</p>
          <p className="text-xs text-gray-500">Paiements Marchands</p>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [wallets, setWallets] = useState(INITIAL_WALLETS);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState<'home' | 'transfer' | 'scan' | 'history' | 'profile'>('home');
  const [view, setView] = useState<'welcome' | 'register' | 'app'>('welcome');

  const handleRegister = (user: User) => {
    setCurrentUser(user);
    setView('app');
  };

  const handleTransfer = (amount: number, from: WalletType, to: string) => {
    const newTx: Transaction = {
      id: `TXN-${Math.floor(Math.random() * 10000)}`,
      type: TransactionType.TRANSFER,
      amount,
      date: new Date().toISOString(),
      description: `Transfert vers ${to}`,
      source: from,
      recipient: to,
      status: 'completed'
    };
    
    setTransactions([newTx, ...transactions]);
    setWallets(prev => ({
      ...prev,
      [from]: { ...prev[from], balance: prev[from].balance - amount }
    }));
    setActiveTab('home');
  };

  const handlePayment = (amount: number, merchant: string) => {
    // Defaulting payment source to Flooz for demo logic or we could ask user
    const source = WalletType.FLOOZ; 
    const newTx: Transaction = {
      id: `PAY-${Math.floor(Math.random() * 10000)}`,
      type: TransactionType.PAYMENT,
      amount,
      date: new Date().toISOString(),
      description: merchant,
      source: source,
      status: 'completed'
    };

    setTransactions([newTx, ...transactions]);
    setWallets(prev => ({
      ...prev,
      [source]: { ...prev[source], balance: prev[source].balance - amount }
    }));
    setActiveTab('home');
  };

  if (view === 'welcome') {
    return (
      <Layout showNav={false} onNavigate={() => {}}>
        <WelcomeScreen onStart={() => setView('register')} />
      </Layout>
    );
  }

  if (view === 'register') {
    return (
      <Layout showNav={false} onNavigate={() => {}}>
        <RegisterScreen onComplete={handleRegister} />
      </Layout>
    );
  }

  return (
    <Layout activeTab={activeTab} onNavigate={setActiveTab}>
      {activeTab === 'home' && (
        <DashboardScreen 
          user={currentUser!} 
          wallets={wallets} 
          transactions={transactions} 
          onNavigate={setActiveTab}
        />
      )}
      {activeTab === 'transfer' && (
        <TransferScreen wallets={wallets} onTransfer={handleTransfer} />
      )}
      {activeTab === 'scan' && (
        <ScanScreen onPay={handlePayment} />
      )}
      {activeTab === 'history' && (
        <HistoryScreen transactions={transactions} />
      )}
      {activeTab === 'profile' && (
        <AboutScreen />
      )}
    </Layout>
  );
}