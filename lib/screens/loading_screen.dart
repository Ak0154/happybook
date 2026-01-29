import 'package:flutter/material.dart';
import 'journey_ready_screen.dart';

class LoadingScreen extends StatefulWidget {
  const LoadingScreen({super.key});

  @override
  State<LoadingScreen> createState() => _LoadingScreenState();
}

class _LoadingScreenState extends State<LoadingScreen> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    )..repeat();

    // Simulate loading delay
    Future.delayed(const Duration(seconds: 4), () {
      if (mounted) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const JourneyReadyScreen()),
        );
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.surface,
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Theme.of(context).colorScheme.primary.withOpacity(0.1),
              Theme.of(context).colorScheme.surface,
            ],
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              const Spacer(),
              // Central Animation
              Stack(
                alignment: Alignment.center,
                children: [
                  RotationTransition(
                    turns: _controller,
                    child: Container(
                      width: 192,
                      height: 192,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: Theme.of(context).colorScheme.primary,
                          width: 8,
                          style: BorderStyle.solid,
                        ),
                        gradient: SweepGradient(
                          colors: [
                            Theme.of(context).colorScheme.primary.withOpacity(0),
                            Theme.of(context).colorScheme.primary,
                          ],
                          stops: const [0.5, 1.0],
                        ),
                      ),
                    ),
                  ),
                  Container(
                    width: 144,
                    height: 144,
                    decoration: BoxDecoration(
                      color: Theme.of(context).cardColor,
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: Theme.of(context).colorScheme.primary.withOpacity(0.2),
                          blurRadius: 20,
                          spreadRadius: 5,
                        ),
                      ],
                    ),
                    child: Icon(
                      Icons.psychology,
                      size: 64,
                      color: Theme.of(context).colorScheme.primary,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 32),
              Text(
                'Building Your Learner Profile',
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.bold,
                      color: Theme.of(context).colorScheme.onSurface,
                    ),
              ),
              const SizedBox(height: 8),
              Text(
                'Analyzing learning patterns...',
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                      color: Theme.of(context).colorScheme.onSurfaceVariant,
                    ),
              ),
              const Spacer(),
              // Footer Progress
              Padding(
                padding: const EdgeInsets.all(32.0),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Finalizing your profile',
                          style: TextStyle(
                            fontWeight: FontWeight.w500,
                            color: Theme.of(context).colorScheme.onSurfaceVariant,
                          ),
                        ),
                        Text(
                          '75%',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Theme.of(context).colorScheme.primary,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(4),
                      child: LinearProgressIndicator(
                        value: 0.75,
                        backgroundColor: Theme.of(context).colorScheme.primary.withOpacity(0.2),
                        valueColor: AlwaysStoppedAnimation<Color>(
                          Theme.of(context).colorScheme.primary,
                        ),
                        minHeight: 8,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
