"use client";

export function StatsSection() {
  return (
    <section className="w-full py-12">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div className="flex flex-col items-center text-center">
          <div className="text-3xl font-bold">50k+</div>
          <div className="text-muted-foreground">Users</div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="text-3xl font-bold">100k+</div>
          <div className="text-muted-foreground">Quizzes Generated</div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="text-3xl font-bold">1.5 Million+</div>
          <div className="text-muted-foreground">True/False Questions</div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="text-3xl font-bold">300k+</div>
          <div className="text-muted-foreground">Hours Saved</div>
        </div>
      </div>
    </section>
  );
}
