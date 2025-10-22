#!/bin/bash

# Script para actualizar todos los imports relativos a aliases

echo "🔄 Actualizando imports a aliases..."

# Función para actualizar imports en un archivo
update_imports() {
    local file="$1"
    echo "📝 Procesando: $file"
    
    # Reemplazar imports relativos con aliases
    sed -i "s|from '../contexts'|from '@contexts'|g" "$file"
    sed -i "s|from '../../contexts'|from '@contexts'|g" "$file"
    sed -i "s|from '../../../contexts'|from '@contexts'|g" "$file"
    sed -i "s|from '../../../../contexts'|from '@contexts'|g" "$file"
    
    sed -i "s|from '../hooks'|from '@hooks'|g" "$file"
    sed -i "s|from '../../hooks'|from '@hooks'|g" "$file"
    sed -i "s|from '../../../hooks'|from '@hooks'|g" "$file"
    
    sed -i "s|from '../model'|from '@model'|g" "$file"
    sed -i "s|from '../../model'|from '@model'|g" "$file"
    sed -i "s|from '../../../model'|from '@model'|g" "$file"
    
    sed -i "s|from '../components'|from '@components'|g" "$file"
    sed -i "s|from '../../components'|from '@components'|g" "$file"
    sed -i "s|from '../../../components'|from '@components'|g" "$file"
    
    sed -i "s|from '../pages'|from '@pages'|g" "$file"
    sed -i "s|from '../../pages'|from '@pages'|g" "$file"
    sed -i "s|from '../../../pages'|from '@pages'|g" "$file"
    
    sed -i "s|from '../assets'|from '@assets'|g" "$file"
    sed -i "s|from '../../assets'|from '@assets'|g" "$file"
    sed -i "s|from '../../../assets'|from '@assets'|g" "$file"
}

# Encontrar todos los archivos .tsx y .ts en src/
find ./src -name "*.tsx" -o -name "*.ts" | while read file; do
    # Excluir archivos de configuración
    if [[ ! "$file" =~ (vite-env|main\.ts)$ ]]; then
        update_imports "$file"
    fi
done

echo "✅ Imports actualizados a aliases!"
echo ""
echo "📋 Aliases configurados:"
echo "  @assets    -> src/assets"
echo "  @components -> src/components"
echo "  @contexts   -> src/contexts"
echo "  @hooks      -> src/hooks"
echo "  @model      -> src/model"
echo "  @pages      -> src/pages"
echo ""
echo "🔄 Reinicia el servidor de desarrollo con: npm run dev"