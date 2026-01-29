import 'package:flutter/material.dart';
import 'psychological_test_screen.dart';

class AcademicTestScreen extends StatefulWidget {
  const AcademicTestScreen({super.key});

  @override
  State<AcademicTestScreen> createState() => _AcademicTestScreenState();
}

class _AcademicTestScreenState extends State<AcademicTestScreen> {
  int _selectedOption = 1; // Default to option 2 (1/2 mv^2)

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.surface,
      body: Stack(
        children: [
          // Background Gradient
          Positioned(
            top: 0,
            left: 0,
            right: 0,
            height: 256,
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Theme.of(context).colorScheme.secondary,
                    Theme.of(context).colorScheme.surface.withOpacity(0),
                  ],
                ),
              ),
            ),
          ),
          SafeArea(
            child: Column(
              children: [
                // Header
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                  child: Row(
                    children: [
                      IconButton(
                        onPressed: () => Navigator.pop(context),
                        icon: const Icon(Icons.close),
                        style: IconButton.styleFrom(
                          backgroundColor: Theme.of(context).cardColor,
                          shape: const CircleBorder(),
                        ),
                      ),
                      Expanded(
                        child: Text(
                          'Physics Test',
                          textAlign: TextAlign.center,
                          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                                fontWeight: FontWeight.bold,
                              ),
                        ),
                      ),
                      const SizedBox(width: 48), // Balance close button
                    ],
                  ),
                ),

                // Content
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(24.0),
                    child: Column(
                      children: [
                        // Progress Info
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'Question 3/10',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w600,
                                color: Theme.of(context).colorScheme.onSurfaceVariant,
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                              decoration: BoxDecoration(
                                color: Theme.of(context).colorScheme.secondary,
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: Row(
                                children: [
                                  Icon(
                                    Icons.timer_outlined,
                                    size: 18,
                                    color: Theme.of(context).colorScheme.onSecondary,
                                  ),
                                  const SizedBox(width: 4),
                                  Text(
                                    '14:35',
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      color: Theme.of(context).colorScheme.onSecondary,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        // Progress Bar
                        ClipRRect(
                          borderRadius: BorderRadius.circular(8),
                          child: LinearProgressIndicator(
                            value: 0.3,
                            backgroundColor: Theme.of(context).colorScheme.secondary,
                            valueColor: AlwaysStoppedAnimation<Color>(
                              Theme.of(context).colorScheme.primary,
                            ),
                            minHeight: 10,
                          ),
                        ),
                        const SizedBox(height: 32),

                        // Question Card
                        Container(
                          padding: const EdgeInsets.all(24),
                          decoration: BoxDecoration(
                            color: Theme.of(context).cardColor,
                            borderRadius: BorderRadius.circular(24),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.05),
                                blurRadius: 20,
                                offset: const Offset(0, 8),
                              ),
                            ],
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'What is the formula for calculating kinetic energy?',
                                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                                      fontWeight: FontWeight.bold,
                                      height: 1.3,
                                    ),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                'Select the correct option from the choices below.',
                                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                      color: Theme.of(context).colorScheme.onSurfaceVariant,
                                    ),
                              ),
                              const SizedBox(height: 24),

                              // Options
                              _buildOption(context, 0, 'mgh'),
                              const SizedBox(height: 12),
                              _buildOption(context, 1, '1/2 mv²'),
                              const SizedBox(height: 12),
                              _buildOption(context, 2, 'F = ma'),
                              const SizedBox(height: 12),
                              _buildOption(context, 3, 'E = mc²'),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
          // Bottom Bar
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.bottomCenter,
                  end: Alignment.topCenter,
                  colors: [
                    Theme.of(context).colorScheme.surface,
                    Theme.of(context).colorScheme.surface.withOpacity(0.9),
                    Theme.of(context).colorScheme.surface.withOpacity(0),
                  ],
                ),
              ),
              child: Row(
                children: [
                  IconButton.filledTonal(
                    onPressed: () {},
                    icon: const Icon(Icons.arrow_back),
                    style: IconButton.styleFrom(
                      backgroundColor: Theme.of(context).colorScheme.secondary,
                      foregroundColor: Theme.of(context).colorScheme.onSecondary,
                      fixedSize: const Size(56, 56),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const PsychologicalTestScreen()),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Theme.of(context).colorScheme.primary,
                        foregroundColor: Theme.of(context).colorScheme.onPrimary,
                        fixedSize: const Size.fromHeight(56),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(30),
                        ),
                        elevation: 4,
                        shadowColor: Theme.of(context).colorScheme.primary.withOpacity(0.4),
                      ),
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            'Next Question',
                            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                          ),
                          SizedBox(width: 8),
                          Icon(Icons.arrow_forward),
                        ],
                      ),
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

  Widget _buildOption(BuildContext context, int index, String text) {
    final isSelected = _selectedOption == index;
    return GestureDetector(
      onTap: () => setState(() => _selectedOption = index),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isSelected
              ? Theme.of(context).colorScheme.secondary
              : Theme.of(context).cardColor,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected
                ? Theme.of(context).colorScheme.primary
                : Theme.of(context).dividerColor.withOpacity(0.1),
            width: 2,
          ),
          boxShadow: isSelected
              ? [
                  BoxShadow(
                    color: Theme.of(context).colorScheme.primary.withOpacity(0.1),
                    blurRadius: 8,
                    offset: const Offset(0, 4),
                  )
                ]
              : [],
        ),
        child: Row(
          children: [
            Container(
              width: 28,
              height: 28,
              decoration: BoxDecoration(
                color: isSelected
                    ? Theme.of(context).colorScheme.primary
                    : Theme.of(context).colorScheme.surface,
                shape: BoxShape.circle,
                border: Border.all(
                  color: isSelected
                      ? Theme.of(context).colorScheme.primary
                      : Theme.of(context).dividerColor,
                  width: 2,
                ),
              ),
              child: isSelected
                  ? Icon(
                      Icons.check,
                      size: 16,
                      color: Theme.of(context).colorScheme.onPrimary,
                    )
                  : null,
            ),
            const SizedBox(width: 16),
            Text(
              text,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w500,
                color: Theme.of(context).colorScheme.onSurface,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
