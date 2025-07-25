"use client";

import { useAuth } from "@/hooks/use-auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Calendar } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <h2 className="text-xl font-medium">Not signed in</h2>
          <p className="text-muted-foreground mt-2">Please sign in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <Button variant="outline">Edit Profile</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 shadow-sm border border-border">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <User size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-medium">{user.email?.split('@')[0]}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
            
            <div className="border-t border-border pt-4 mt-4">
              <div className="grid gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="shadow-sm border border-border">
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Account Stats</h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-muted-foreground">Quizzes Created</div>
              </div>
              <div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-muted-foreground">Quizzes Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-muted-foreground">Average Score</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
