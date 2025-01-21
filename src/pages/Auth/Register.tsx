import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Upload, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    country: '',
    idType: '',
    idDocument: null,
    email: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));

    if (files && files[0]) {
      toast.success("Document uploaded successfully!");
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      toast.success("Step completed successfully!");
    } else {
      try {
        // Here you would typically handle the registration with your backend
        console.log('Registration data:', formData);
        toast.success("Registration successful! Redirecting to dashboard...");
        
        // Add a small delay to show the success message before redirecting
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } catch (err) {
        setError('Registration failed. Please try again.');
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#00B4D8] to-[#023E8A] bg-clip-text text-transparent">
                Choose Your Location
              </CardTitle>
              <CardDescription>
                Select your country to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select 
                name="country" 
                onValueChange={(value) => handleSelectChange('country', value)}
              >
                <SelectTrigger className="w-full h-12 bg-white/50 backdrop-blur-sm border-[#90E0EF] hover:border-[#00B4D8] transition-all">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">🇺🇸 United States</SelectItem>
                  <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                  <SelectItem value="ca">🇨🇦 Canada</SelectItem>
                  <SelectItem value="au">🇦🇺 Australia</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#00B4D8] to-[#023E8A] bg-clip-text text-transparent">
                Verify Your Identity
              </CardTitle>
              <CardDescription>
                Upload a valid identification document
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select 
                name="idType" 
                onValueChange={(value) => handleSelectChange('idType', value)}
              >
                <SelectTrigger className="w-full h-12 bg-white/50 backdrop-blur-sm border-[#90E0EF] hover:border-[#00B4D8] transition-all">
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="driving_license">Driving License</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="mt-4">
                <label 
                  htmlFor="idDocument" 
                  className="group relative flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#90E0EF] bg-white/50 hover:bg-white/70 hover:border-[#00B4D8] transition-all backdrop-blur-sm"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-10 w-10 text-[#00B4D8] mb-2 group-hover:scale-110 transition-transform" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG or PDF (MAX. 10MB)</p>
                  </div>
                  <input 
                    id="idDocument" 
                    type="file" 
                    name="idDocument"
                    className="hidden" 
                    onChange={handleInputChange}
                    accept="image/*,.pdf"
                  />
                </label>
              </div>
            </CardContent>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#00B4D8] to-[#023E8A] bg-clip-text text-transparent">
                Create Your Account
              </CardTitle>
              <CardDescription>
                Set up your login credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-12 bg-white/50 backdrop-blur-sm border-[#90E0EF] hover:border-[#00B4D8] transition-all"
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="username"
                  placeholder="Choose username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="h-12 bg-white/50 backdrop-blur-sm border-[#90E0EF] hover:border-[#00B4D8] transition-all"
                />
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="h-12 bg-white/50 backdrop-blur-sm border-[#90E0EF] hover:border-[#00B4D8] transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </CardContent>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F7F7F8] to-[#90E0EF]/20 p-4">
      <Card className="w-full max-w-md backdrop-blur-xl bg-white/70 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {renderStep()}

          <div className="p-6 pt-0">
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-[#00B4D8] to-[#023E8A] hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02]"
            >
              {currentStep === 3 ? 'Complete Registration' : 'Continue'}
            </Button>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => navigate('/auth/login')}
                className="text-sm text-[#023E8A] hover:text-[#00B4D8] transition-colors"
              >
                Already have an account? Sign in
              </button>
            </div>
          </div>
        </form>

        <div className="px-6 pb-6">
          <div className="flex justify-center space-x-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === currentStep 
                    ? 'w-8 bg-gradient-to-r from-[#00B4D8] to-[#023E8A]' 
                    : 'w-2 bg-[#90E0EF]'
                }`}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;
