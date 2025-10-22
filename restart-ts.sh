#!/bin/bash

echo "🔄 Reiniciando TypeScript Language Server..."

# Crear directorio .vscode si no existe
mkdir -p .vscode

# Crear configuración para VS Code
cat > .vscode/settings.json << EOF
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.preferences.includePackageJsonAutoImports": "auto",
  "typescript.workspaceSymbols.scope": "allOpenProjects"
}
EOF

echo "✅ Configuración de VS Code creada"
echo ""
echo "🔧 Para reiniciar TypeScript en VS Code:"
echo "   1. Abre la Command Palette (Ctrl+Shift+P / Cmd+Shift+P)"
echo "   2. Ejecuta: 'TypeScript: Restart TS Server'"
echo ""
echo "🔄 O reinicia VS Code completamente"
echo ""
echo "📝 También puedes usar Ctrl+Shift+P -> 'Developer: Reload Window'"