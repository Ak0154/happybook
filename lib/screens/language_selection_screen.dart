import 'package:flutter/material.dart';
import 'academic_test_screen.dart';

class LanguageSelectionScreen extends StatefulWidget {
  const LanguageSelectionScreen({super.key});

  @override
  State<LanguageSelectionScreen> createState() => _LanguageSelectionScreenState();
}

class _LanguageSelectionScreenState extends State<LanguageSelectionScreen> {
  String _selectedLanguage = 'English';

  final List<Map<String, String>> _languages = [
    {'name': 'English', 'native': 'English', 'flag': '🇬🇧'},
    {'name': 'Spanish', 'native': 'Español', 'flag': '🇪🇸'},
    {'name': 'French', 'native': 'Français', 'flag': '🇫🇷'},
    {'name': 'German', 'native': 'Deutsch', 'flag': '🇩🇪'},
    {'name': 'Hindi', 'native': 'हिन्दी', 'flag': '🇮🇳'},
    {'name': 'Bengali', 'native': 'বাংলা', 'flag': '🇧🇩'},
  ];

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
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  IconButton(
                    onPressed: () => Navigator.pop(context),
                    icon: const Icon(Icons.arrow_back),
                    style: IconButton.styleFrom(
                      backgroundColor: Colors.transparent,
                      foregroundColor: Theme.of(context).colorScheme.onSurface,
                    ),
                  ),
                  Text(
                    'Language',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                  ),
                  const SizedBox(width: 40), // Balance the back button
                ],
              ),
            ),

            // Content
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 16),
                    Text(
                      'What language do you prefer?',
                      style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                            color: Theme.of(context).colorScheme.onSurface,
                          ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Choose your preferred language for the app interface.',
                      style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                            color: Theme.of(context).colorScheme.onSurfaceVariant,
                          ),
                    ),
                    const SizedBox(height: 24),

                    // Search Bar
                    TextField(
                      decoration: InputDecoration(
                        hintText: 'Search for a language...',
                        prefixIcon: Icon(
                          Icons.search,
                          color: Theme.of(context).colorScheme.onSurfaceVariant,
                        ),
                        filled: true,
                        fillColor: Theme.of(context).cardColor,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: BorderSide.none,
                        ),
                        contentPadding: const EdgeInsets.symmetric(vertical: 16),
                      ),
                    ),
                    const SizedBox(height: 24),

                    // Language List
                    Expanded(
                      child: ListView.separated(
                        itemCount: _languages.length,
                        separatorBuilder: (context, index) => const SizedBox(height: 12),
                        itemBuilder: (context, index) {
                          final language = _languages[index];
                          final isSelected = _selectedLanguage == language['name'];

                          return GestureDetector(
                            onTap: () => setState(() => _selectedLanguage = language['name']!),
                            child: Container(
                              padding: const EdgeInsets.all(16),
                              decoration: BoxDecoration(
                                color: isSelected
                                    ? Theme.of(context).colorScheme.primary
                                    : Theme.of(context).cardColor,
                                borderRadius: BorderRadius.circular(16),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black.withOpacity(0.05),
                                    blurRadius: 10,
                                    offset: const Offset(0, 4),
                                  ),
                                ],
                              ),
                              child: Row(
                                children: [
                                  Container(
                                    width: 48,
                                    height: 48,
                                    decoration: BoxDecoration(
                                      color: isSelected
                                          ? Colors.white.withOpacity(0.2)
                                          : Theme.of(context).colorScheme.surface,
                                      borderRadius: BorderRadius.circular(12),
                                    ),
                                    alignment: Alignment.center,
                                    child: Text(
                                      language['flag']!,
                                      style: const TextStyle(fontSize: 24),
                                    ),
                                  ),
                                  const SizedBox(width: 16),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          language['native']!,
                                          style: TextStyle(
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold,
                                            color: isSelected
                                                ? Theme.of(context).colorScheme.onPrimary
                                                : Theme.of(context).colorScheme.onSurface,
                                          ),
                                        ),
                                        Text(
                                          language['name']!,
                                          style: TextStyle(
                                            fontSize: 14,
                                            color: isSelected
                                                ? Theme.of(context).colorScheme.onPrimary.withOpacity(0.8)
                                                : Theme.of(context).colorScheme.onSurfaceVariant,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  if (isSelected)
                                    Container(
                                      width: 24,
                                      height: 24,
                                      decoration: BoxDecoration(
                                        color: Theme.of(context).colorScheme.onPrimary,
                                        shape: BoxShape.circle,
                                      ),
                                      child: Icon(
                                        Icons.check,
                                        size: 16,
                                        color: Theme.of(context).colorScheme.primary,
                                      ),
                                    )
                                  else
                                    Container(
                                      width: 24,
                                      height: 24,
                                      decoration: BoxDecoration(
                                        border: Border.all(
                                          color: Theme.of(context).colorScheme.onSurfaceVariant,
                                          width: 2,
                                        ),
                                        shape: BoxShape.circle,
                                      ),
                                    ),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
                    ),
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
                    MaterialPageRoute(builder: (context) => const AcademicTestScreen()),
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
                child: const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Continue',
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
    );
  }
}
