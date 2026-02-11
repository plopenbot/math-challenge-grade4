// 宝可梦数据 - 使用 PokeAPI 获取图片
// 使用更小的图片版本以提升加载速度
// 主站图片: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png (小尺寸)
// 高清图片: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png (大尺寸)

const pokemonData = {
    total: 1025, // 目前共有1025只宝可梦
    shinyRate: 0.1, // 10%概率出现闪光
    
    // 获取随机宝可梦
    getRandom: function() {
        const id = Math.floor(Math.random() * this.total) + 1;
        const isShiny = Math.random() < this.shinyRate;
        
        // 使用更小的图片版本（96x96），加载速度更快
        // 如果需要更大尺寸可以使用 other/official-artwork 路径
        const baseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
        
        return {
            id: id,
            isShiny: isShiny,
            name: `宝可梦 #${id}`,
            imageUrl: isShiny 
                ? `${baseUrl}/shiny/${id}.png`
                : `${baseUrl}/${id}.png`,
            rarity: isShiny ? '✨ 闪光' : '普通'
        };
    },
    
    // 获取随机鼓励语
    getEncouragement: function() {
        const messages = [
            '太棒了！',
            '真聪明！',
            '继续加油！',
            '答对啦！',
            '你真厉害！',
            '完美！',
            '好样的！',
            '真优秀！'
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }
};
