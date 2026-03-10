import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  Zap,
  Lightbulb,
  Shield,
  Brain,
  Search,
  MessageSquareText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePageTracker } from "@/hooks/use-page-tracker";
import { useSEO } from "@/hooks/use-seo";

const principles = [
  {
    icon: Eye,
    title: "Transparency",
    description: "Job seekers deserve clearer signals about the opportunities they pursue.",
  },
  {
    icon: Zap,
    title: "Efficiency",
    description: "Applying for jobs should not involve unnecessary guesswork.",
  },
  {
    icon: Lightbulb,
    title: "Awareness",
    description: "Understanding hiring patterns can help candidates avoid wasted time and potential scams.",
  },
];

export default function AboutPage() {
  usePageTracker("about");
  useSEO({
    title: "About Ghost Job Detector | Our Mission",
    description: "Ghost Job Detector brings transparency to the modern job search. Learn about our mission to help job seekers identify ghost jobs, fake listings, and hiring scams.",
    path: "/about",
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-14">
            <Link href="/" data-testid="link-home">
              <div className="flex items-center gap-2.5 cursor-pointer">
                <img src="/ghost-logo.png" alt="Ghost Job Detector" className="w-9 h-9 rounded" />
                <span className="text-sm font-semibold tracking-tight text-teal-600 dark:text-teal-400">Ghost Job Detector</span>
              </div>
            </Link>
            <div className="flex items-center gap-1">
              <Link href="/">
                <Button variant="ghost" size="sm" data-testid="button-back-home">
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  Back
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          <div className="text-center space-y-3" data-testid="section-hero">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground" data-testid="text-page-title">
              About Ghost Job Detector
            </h1>
            <p className="text-lg text-teal-600 dark:text-teal-400 font-medium">
              Bringing transparency to the modern job search.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-5"
            data-testid="section-mission"
          >
            <p className="text-base text-foreground leading-relaxed">
              In today's hiring landscape, many job seekers spend hours applying to positions that may no longer be active, were posted only for data collection, or were never intended to be filled. These listings, often called "ghost jobs," create frustration, waste time, and erode trust in online hiring platforms.
            </p>
            <p className="text-base text-foreground leading-relaxed font-medium">
              Ghost Job Detector helps job seekers make more informed decisions before applying.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Our browser extension analyzes publicly available job listings and identifies potential warning signs such as duplicate postings, outdated listings, vague job descriptions, and other indicators commonly associated with inactive or misleading job opportunities. The tool then provides a simple risk indicator to help users evaluate whether a posting appears legitimate, questionable, or potentially misleading.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Our goal is not to replace job boards, but to empower job seekers with additional insight and awareness while navigating the job market.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-5"
            data-testid="section-principles"
          >
            <h2 className="text-xl font-semibold text-foreground">
              Ghost Job Detector was built with a few guiding principles:
            </h2>
            <div className="grid gap-4">
              {principles.map((principle, i) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.08 }}
                >
                  <Card className="border bg-card/50 dark:bg-card/30" data-testid={`card-principle-${i}`}>
                    <CardContent className="p-5">
                      <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-500/10 dark:bg-teal-500/15 flex items-center justify-center">
                          <principle.icon className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-sm text-foreground">{principle.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{principle.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-5"
            data-testid="section-ai-models"
          >
            <h2 className="text-xl font-semibold text-foreground">
              Powered by a Three-Model AI Pipeline
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every job listing is analyzed simultaneously by three specialized AI models, each contributing a unique perspective to generate a comprehensive risk assessment.
            </p>
            <div className="grid gap-4">
              <Card className="border bg-card/50 dark:bg-card/30" data-testid="card-ai-chatgpt">
                <CardContent className="p-5">
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-sm text-foreground">ChatGPT <span className="text-xs font-normal text-muted-foreground">(OpenAI)</span></h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">Risk scoring and red flag detection. Evaluates the overall job posting for ghost job indicators, scam patterns, and assigns the primary ghost score.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border bg-card/50 dark:bg-card/30" data-testid="card-ai-claude">
                <CardContent className="p-5">
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-violet-500/10 dark:bg-violet-500/15 flex items-center justify-center">
                      <MessageSquareText className="w-5 h-5 text-violet-500 dark:text-violet-400" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-sm text-foreground">Claude <span className="text-xs font-normal text-muted-foreground">(Anthropic)</span></h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">Language and tone analysis. Measures vagueness, professionalism, and detects manipulative or deceptive language patterns in the job description.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border bg-card/50 dark:bg-card/30" data-testid="card-ai-perplexity">
                <CardContent className="p-5">
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 flex items-center justify-center">
                      <Search className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-sm text-foreground">Perplexity <span className="text-xs font-normal text-muted-foreground">(Web Search AI)</span></h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">Real-time company verification. Searches the web to confirm whether the company exists, has a legitimate web presence, and matches the industry of the posted role.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            data-testid="section-privacy"
          >
            <Card className="border border-teal-500/20 bg-teal-500/5 dark:bg-teal-500/10">
              <CardContent className="p-5 flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-500/10 dark:bg-teal-500/15 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The extension does not collect personal data from users and analyzes job listings using information already available on public job pages.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-base text-muted-foreground leading-relaxed"
            data-testid="text-closing"
          >
            Ghost Job Detector is an independent project focused on helping job seekers navigate an increasingly complex hiring environment with more confidence and clarity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-3 pt-2 pb-4"
          >
            <Link href="/">
              <Button variant="outline" size="sm" data-testid="button-try-scanner">
                Try the Web Scanner
              </Button>
            </Link>
            <Link href="/extension">
              <Button variant="outline" size="sm" data-testid="button-get-extension">
                Get the Extension
              </Button>
            </Link>
          </motion.div>

          <footer className="text-center pb-6 pt-2 border-t border-border/40">
            <p className="text-xs text-muted-foreground" data-testid="text-footer">
              GhostJobDetector 2026
            </p>
          </footer>
        </motion.div>
      </main>
    </div>
  );
}
