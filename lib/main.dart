import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'screens/welcome_screen.dart';

void main() {
  runApp(const HappyBook());
}

class HappyBook extends StatelessWidget {
  const HappyBook({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Happy Book',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: const ColorScheme(
          brightness: Brightness.light,
          primary: Color(0xFF644a40),
          onPrimary: Color(0xFFffffff),
          secondary: Color(0xFFffdfb5),
          onSecondary: Color(0xFF582d1d),
          error: Color(0xFFe54d2e),
          onError: Color(0xFFffffff),
          surface: Color(0xFFf9f9f9),
          onSurface: Color(0xFF202020),
          onSurfaceVariant: Color(0xFF646464),
        ),
        textTheme: GoogleFonts.lexendTextTheme(
          Theme.of(context).textTheme,
        ),
        cardColor: const Color(0xFFfcfcfc),
      ),
      darkTheme: ThemeData(
        useMaterial3: true,
        colorScheme: const ColorScheme(
          brightness: Brightness.dark,
          primary: Color(0xFFffe0c2),
          onPrimary: Color(0xFF081a1b),
          secondary: Color(0xFF393028),
          onSecondary: Color(0xFFffe0c2),
          error: Color(0xFFe54d2e),
          onError: Color(0xFFffffff),
          surface: Color(0xFF111111),
          onSurface: Color(0xFFeeeeee),
          onSurfaceVariant: Color(0xFFb4b4b4),
        ),
        textTheme: GoogleFonts.lexendTextTheme(
          ThemeData.dark().textTheme,
        ),
        cardColor: const Color(0xFF191919),
      ),
      themeMode: ThemeMode.system,
      home: const WelcomeScreen(),
    );
  }
}
