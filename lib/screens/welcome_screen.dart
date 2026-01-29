import 'package:flutter/material.dart';
import 'login_screen.dart';

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.surface,
      body: Stack(
        children: [
          // Background Gradient Blob
          Positioned(
            top: 0,
            left: 0,
            right: 0,
            height: 384, // h-96
            child: Container(
              decoration: BoxDecoration(
                gradient: RadialGradient(
                  center: Alignment.center,
                  radius: 0.5,
                  colors: [
                    Theme.of(context).colorScheme.primary.withOpacity(0.3),
                    Colors.transparent,
                  ],
                  stops: const [0.0, 1.0],
                ),
              ),
            ),
          ),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const Spacer(),
                  // Center Content
                  Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      // Icon Card
                      Container(
                        width: 112, // w-28
                        height: 112, // h-28
                        decoration: BoxDecoration(
                          color: Theme.of(context).cardColor,
                          borderRadius: BorderRadius.circular(24), // rounded-3xl
                          boxShadow: [
                            BoxShadow(
                              color: const Color(0xFF3E0640).withOpacity(0.1), // shadow-lg approximation
                              offset: const Offset(0, 10),
                              blurRadius: 15,
                              spreadRadius: -3,
                            ),
                          ],
                        ),
                        child: Center(
                          child: Icon(
                            Icons.school_outlined,
                            size: 60, // text-6xl
                            color: Theme.of(context).colorScheme.primary,
                            weight: 300,
                          ),
                        ),
                      ),
                      const SizedBox(height: 32), // mt-8
                      Text(
                        'Welcome to \nHappy Book',
                        textAlign: TextAlign.center,
                        style: Theme.of(context).textTheme.displayLarge?.copyWith(
                              fontSize: 36, // text-4xl
                              fontWeight: FontWeight.bold,
                              height: 1.1,
                              letterSpacing: -0.025, // tracking-tight
                              color: Theme.of(context).colorScheme.onSurface,
                            ),
                      ),
                      const SizedBox(height: 16), // mt-4
                      Text(
                        'Last-minute academic support.',
                        textAlign: TextAlign.center,
                        style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                              color: Theme.of(context).colorScheme.onSurfaceVariant,
                              height: 1.625, // leading-relaxed
                            ),
                      ),
                    ],
                  ),
                  const Spacer(),
                  // Bottom Actions
                  Padding(
                    padding: const EdgeInsets.only(top: 64.0, bottom: 16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        ElevatedButton(
                          onPressed: () {
                            Navigator.of(context).push(
                              MaterialPageRoute(
                                builder: (context) => const LoginScreen(),
                              ),
                            );
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Theme.of(context).colorScheme.primary,
                            foregroundColor: Theme.of(context).colorScheme.onPrimary,
                            elevation: 0,
                            shadowColor: Theme.of(context).colorScheme.primary.withOpacity(0.3),
                            fixedSize: const Size.fromHeight(56), // h-14
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12), // rounded-xl
                            ),
                            textStyle: const TextStyle(
                              fontSize: 18, // text-lg
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          child: const Text('Get Started'),
                        ),
                        const SizedBox(height: 16),
                        TextButton(
                          onPressed: () {},
                          style: TextButton.styleFrom(
                            foregroundColor: Theme.of(context).colorScheme.onSurfaceVariant,
                          ),
                          child: const Text(
                            'I already have an account',
                            style: TextStyle(
                              fontSize: 14, // text-sm
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
