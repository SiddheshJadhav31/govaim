import { BarChart, Activity, Users, FileText } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your legislative overview.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<BarChart className="text-blue-500" />}
          title="Active Bills"
          value="127"
          trend="+12%"
        />
        <StatCard
          icon={<Activity className="text-green-500" />}
          title="Success Rate"
          value="68%"
          trend="+5%"
        />
        <StatCard
          icon={<Users className="text-purple-500" />}
          title="Key Stakeholders"
          value="45"
          trend="+3"
        />
        <StatCard
          icon={<FileText className="text-orange-500" />}
          title="Reports"
          value="12"
          trend="+2"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <ActivityItem key={index} {...activity} />
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
          <div className="space-y-4">
            {deadlines.map((deadline, index) => (
              <DeadlineItem key={index} {...deadline} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, trend }) => (
  <div className="card">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-600 mb-1">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
    </div>
    <p className="text-sm text-green-600 mt-2">{trend} from last month</p>
  </div>
);

const ActivityItem = ({ title, time, type }) => (
  <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
    <div className="w-2 h-2 rounded-full bg-blue-500" />
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-600">{time}</p>
    </div>
    <span className="ml-auto text-sm text-gray-500">{type}</span>
  </div>
);

const DeadlineItem = ({ title, date, status }) => (
  <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
    <div className="w-2 h-2 rounded-full bg-red-500" />
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-600">{date}</p>
    </div>
    <span className={`ml-auto text-sm px-2 py-1 rounded ${
      status === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
    }`}>
      {status}
    </span>
  </div>
);

const activities = [
  { title: "Bill H.R. 123 Status Update", time: "2 hours ago", type: "Update" },
  { title: "New Stakeholder Added", time: "4 hours ago", type: "Network" },
  { title: "Committee Hearing Scheduled", time: "6 hours ago", type: "Event" },
];

const deadlines = [
  { title: "Submit Committee Testimony", date: "Tomorrow, 9:00 AM", status: "Urgent" },
  { title: "Bill Amendment Review", date: "In 2 days", status: "Upcoming" },
  { title: "Stakeholder Meeting", date: "Next week", status: "Planned" },
];

export default Dashboard;