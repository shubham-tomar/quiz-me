"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export function ProfileCard() {
  const { user, signOut } = useAuth();
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          {user && (
            <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
          )}
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
