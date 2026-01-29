import 'package:flutter/material.dart';
import 'loading_screen.dart';

class PsychologicalTestScreen extends StatefulWidget {
  const PsychologicalTestScreen({super.key});

  @override
  State<PsychologicalTestScreen> createState() => _PsychologicalTestScreenState();
}

class _PsychologicalTestScreenState extends State<PsychologicalTestScreen> {
  int _selectedOption = 1;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.surface,
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
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
                  const SizedBox(width: 16),
                  Expanded(
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: LinearProgressIndicator(
                        value: 0.3,
                        backgroundColor: Theme.of(context).dividerColor.withOpacity(0.2),
                        valueColor: AlwaysStoppedAnimation<Color>(
                          Theme.of(context).colorScheme.primary,
                        ),
                        minHeight: 10,
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Container(
                    width: 44,
                    height: 44,
                    decoration: BoxDecoration(
                      color: Theme.of(context).colorScheme.primary.withOpacity(0.1),
                      shape: BoxShape.circle,
                    ),
                    alignment: Alignment.center,
                    child: Text(
                      '3/10',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // Content
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(24.0),
                child: Column(
                  children: [
                    const SizedBox(height: 16),
                    Container(
                      width: 96,
                      height: 96,
                      decoration: BoxDecoration(
                        color: Theme.of(context).colorScheme.primary.withOpacity(0.1),
                        shape: BoxShape.circle,
                      ),
                      child: Icon(
                        Icons.psychology,
                        size: 48,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Question 3 of 10',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color: Theme.of(context).colorScheme.primary,
                        letterSpacing: 1.2,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'When faced with a difficult new topic, you are most likely to...',
                      textAlign: TextAlign.center,
                      style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                            fontWeight: FontWeight.bold,
                            color: Theme.of(context).colorScheme.onSurface,
                          ),
                    ),
                    const SizedBox(height: 32),

                    // Options
                    _buildOption(context, 0, 'Dive in and try to figure it out on my own.'),
                    const SizedBox(height: 12),
                    _buildOption(context, 1, 'Look for a video tutorial first.'),
                    const SizedBox(height: 12),
                    _buildOption(context, 2, 'Read articles and documentation.'),
                    const SizedBox(height: 12),
                    _buildOption(context, 3, 'Ask a friend or mentor for help.'),
                  ],
                ),
              ),
            ),

            // Footer
            Padding(
              padding: const EdgeInsets.all(24.0),
              child: ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const LoadingScreen()),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Theme.of(context).colorScheme.primary,
                  foregroundColor: Theme.of(context).colorScheme.onPrimary,
                  fixedSize: const Size.fromHeight(56),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  elevation: 4,
                  shadowColor: Theme.of(context).colorScheme.primary.withOpacity(0.4),
                ),
                child: const Text(
                  'Continue',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
              ),
            ),
          ],
        ),
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
              ? Theme.of(context).colorScheme.primary.withOpacity(0.1)
              : Theme.of(context).cardColor,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected
                ? Theme.of(context).colorScheme.primary
                : Theme.of(context).dividerColor,
            width: 2,
          ),
          boxShadow: isSelected
              ? []
              : [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.05),
                    blurRadius: 4,
                    offset: const Offset(0, 2),
                  ),
                ],
        ),
        child: Row(
          children: [
            Container(
              width: 24,
              height: 24,
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
                      Icons.circle,
                      size: 12,
                      color: Theme.of(context).colorScheme.onPrimary,
                    )
                  : null,
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Text(
                text,
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: Theme.of(context).colorScheme.onSurface,
                ),
              ),
            ),
            if (isSelected)
              Container(
                margin: const EdgeInsets.only(left: 8),
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.primary,
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  Icons.check,
                  size: 16,
                  color: Theme.of(context).colorScheme.onPrimary,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
