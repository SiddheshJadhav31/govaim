import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Network } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Transform Your Legislative Strategy with AI
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              GovAim empowers organizations with AI-driven insights for more effective legislative advocacy and stakeholder engagement.
            </p>
            <button 
              onClick={() => navigate('/app')}
              className="bg-accent hover:bg-accent-light text-primary font-semibold px-8 py-3 rounded-lg flex items-center gap-2"
            >
              Get Started
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<Zap className="text-accent" size={32} />}
            title="Predictive Analytics"
            description="Leverage AI to predict legislative outcomes and identify key opportunities for engagement."
          />
          <FeatureCard 
            icon={<Network className="text-accent" size={32} />}
            title="Stakeholder Mapping"
            description="Visualize and analyze complex relationships between legislators, organizations, and key stakeholders."
          />
          <FeatureCard 
            icon={<Shield className="text-accent" size={32} />}
            title="Compliance Tracking"
            description="Stay compliant with automated monitoring and real-time alerts on policy changes."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="card">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Landing;