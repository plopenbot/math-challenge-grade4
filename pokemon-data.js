// 宝可梦数据 - 使用 PokeAPI 获取图片
// 普通图片: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png
// 闪光图片: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/{id}.png

const pokemonData = {
    total: 1025, // 目前共有1025只宝可梦
    shinyRate: 0.1, // 10%概率出现闪光
    
    // 获取随机宝可梦
    getRandom: function() {
        const id = Math.floor(Math.random() * this.total) + 1;
        const isShiny = Math.random() < this.shinyRate;
        
        return {
            id: id,
            isShiny: isShiny,
            name: `宝可梦 #${id}`,
            imageUrl: isShiny 
                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`
                : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
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
