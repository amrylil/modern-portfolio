"use client";
import { useEffect, useState } from "react";
import { GoRepo, GoPerson, GoLocation, GoOrganization } from "react-icons/go";

interface GitHubProfile {
  avatar_url: string;
  login: string;
  html_url: string;
  public_repos: number;
  followers: number;
  bio: string;
  location: string;
  company: string;
}

export default function GitHubProfile() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/amrylil")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error("Error fetching GitHub profile:", err));
  }, []);

  if (!profile) {
    return (
      <div className="flex flex-col items-center md:items-start gap-3 p-4 w-full md:w-96 flex-shrink-0 animate-pulse">
        <div className="w-24 h-24 rounded-full bg-neutral-700"></div>
        <div className="h-5 bg-neutral-700 rounded w-1/2 mt-2"></div>
        <div className="h-4 bg-neutral-700 rounded w-3/4"></div>
        <hr className="w-full border-neutral-700 my-2" />
        <div className="h-4 bg-neutral-700 rounded w-1/2"></div>
        <div className="h-4 bg-neutral-700 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center md:items-start gap-3 p-4 w-full md:w-96 border-r md:border-r-neutral-500">
      <div className="flex gap-4">
        <img
          src={profile.avatar_url}
          alt={profile.login}
          className="w-24 h-24 rounded-full border-2 border-neutral-700"
        />

        <div className="flex flex-col  md:items-start gap-1">
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold text-neutral-100 hover:text-blue-400"
          >
            @{profile.login}
          </a>
          <p className="text-sm text-neutral-300 mt-1  md:text-left">
            {profile.bio || "No bio available"}
          </p>
          <div className="flex items-center text-xs gap-1.5">
            <GoRepo className="text-neutral-500" />
            <span>{profile.public_repos}</span>
            <span>Repositories</span>
          </div>
          <div className="flex items-center text-xs gap-1.5">
            <GoPerson className="text-neutral-500" />
            <span>{profile.followers}</span>
            <span>Followers</span>
          </div>
        </div>
      </div>

      {/* Info Tambahan: Company & Location (dengan ikon) */}
      <div className="flex flex-col gap-1.5 mt-2 text-sm text-neutral-400 text-center md:text-left">
        {profile.location && (
          <div className="flex text-xs items-center gap-2">
            <GoLocation className="text-neutral-500 flex-shrink-0" />
            <span>Southeast Sulawesi, Indonesia</span>
          </div>
        )}
      </div>
    </div>
  );
}
