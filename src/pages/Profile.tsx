import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Camera, Shield, Mail, Building, MapPin, Globe, TwitterIcon, GithubIcon, LinkedinIcon } from 'lucide-react';

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@acme.com',
    role: 'owner',
    company: 'Acme Corp',
    location: 'San Francisco, CA',
    website: 'https://johndoe.com',
    twitter: '@johndoe',
    github: 'johndoe',
    linkedin: 'johndoe',
    bio: 'Building the future of enterprise data analytics. Previously at Google, Meta.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, save to backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/70 hover:text-teal-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold">Profile Settings</h1>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-teal-500/20 to-blue-500/20">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-32 h-32 rounded-xl border-4 border-black"
                />
                <button className="absolute bottom-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-lg backdrop-blur-sm transition-all">
                  <Camera className="w-4 h-4 text-white/70" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-20 p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-white/90">{profile.name}</h2>
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-white/50">{profile.bio}</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-teal-500/20 text-teal-400 rounded-lg border border-teal-500/30 hover:bg-teal-500/30 transition-all"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-white/70 mb-2 block">Email</label>
                  <div className="flex items-center gap-2 text-white/90">
                    <Mail className="w-4 h-4 text-white/50" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-teal-500/50"
                      />
                    ) : (
                      profile.email
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white/70 mb-2 block">Company</label>
                  <div className="flex items-center gap-2 text-white/90">
                    <Building className="w-4 h-4 text-white/50" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.company}
                        onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-teal-500/50"
                      />
                    ) : (
                      profile.company
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white/70 mb-2 block">Location</label>
                  <div className="flex items-center gap-2 text-white/90">
                    <MapPin className="w-4 h-4 text-white/50" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-teal-500/50"
                      />
                    ) : (
                      profile.location
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-white/70 mb-2 block">Website</label>
                  <div className="flex items-center gap-2 text-white/90">
                    <Globe className="w-4 h-4 text-white/50" />
                    {isEditing ? (
                      <input
                        type="url"
                        value={profile.website}
                        onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-teal-500/50"
                      />
                    ) : (
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
                        {profile.website}
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white/70 mb-2 block">Social Profiles</label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white/90">
                      <TwitterIcon className="w-4 h-4 text-white/50" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={profile.twitter}
                          onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-teal-500/50"
                        />
                      ) : (
                        profile.twitter
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-white/90">
                      <GithubIcon className="w-4 h-4 text-white/50" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={profile.github}
                          onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-teal-500/50"
                        />
                      ) : (
                        profile.github
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-white/90">
                      <LinkedinIcon className="w-4 h-4 text-white/50" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={profile.linkedin}
                          onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-teal-500/50"
                        />
                      ) : (
                        profile.linkedin
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};