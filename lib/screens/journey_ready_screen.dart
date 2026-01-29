import 'package:flutter/material.dart';

class JourneyReadyScreen extends StatelessWidget {
  const JourneyReadyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.surface,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            children: [
              const Spacer(),
              // Illustration Placeholder
              AspectRatio(
                aspectRatio: 1,
                child: Container(
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: Theme.of(context).colorScheme.secondary,
                    borderRadius: BorderRadius.circular(32),
                    image: const DecorationImage(
                      image: NetworkImage(
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuBE4u0Ez09W6uoNUneLZuHU9l9Jn3dSRa6BmZK5XVBQ3Wc25O4hg7DBm9SX47sNlIX2Txt4aa0DekVfJ1TU92vRTtIGEqTPfMTiJnaFwX9WEK_gQI2a32hTRFlWoKc3Orh3WOXjgdkJD0EOXnFGYE-TwiUHtvxigeH9L63gRCW_lZ9QpfphIgQ4mWxjO6rhS2NcjJS33BmBYHZa6WrntVBxt4Rse5R-0uY_3fDkXLw6-qagH6xZ-b9fS0KwMatlmNAJI1E8lAz84Ac'),
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 32),
              Text(
                'Your Personalized Journey Is Ready!',
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                      height: 1.2,
                      color: Theme.of(context).colorScheme.onSurface,
                    ),
              ),
              const SizedBox(height: 16),
              Text(
                "We've crafted a unique learning path just for you, powered by AI to help you stay ahead.",
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                      color: Theme.of(context).colorScheme.onSurfaceVariant,
                      height: 1.5,
                    ),
              ),
              const Spacer(),
              // Action Button
              ElevatedButton(
                onPressed: () {
                  // Navigate to Dashboard (Future Step)
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Theme.of(context).colorScheme.primary,
                  foregroundColor: Theme.of(context).colorScheme.onPrimary,
                  fixedSize: const Size.fromHeight(56),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  elevation: 8,
                  shadowColor: Theme.of(context).colorScheme.primary.withOpacity(0.5),
                ),
                child: const Text(
                  'Begin My Journey',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
              ),
              const SizedBox(height: 16),
              TextButton(
                onPressed: () {},
                child: Text(
                  'Preview My Plan',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                    decoration: TextDecoration.underline,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
