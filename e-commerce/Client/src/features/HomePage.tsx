import { 
    Typography, 
    Container, 
    Box, 
    Grid, 
    Card, 
    CardContent, 
    CardMedia, 
    Button, 
    Paper,
    Chip,
    Rating,
    Avatar,
    Stack,
    IconButton,
    Snackbar,
    Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
    ShoppingCart, 
    LocalShipping, 
    Security, 
    Support,
    Star,
    TrendingUp,
    FlashOn,
    Favorite
} from "@mui/icons-material";

export default function HomePage() {
    const navigate = useNavigate();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [email, setEmail] = useState('');
    
    const featuredProducts = [
        {
            id: 1,
            name: "Akıllı Telefon",
            price: "12.999 TL",
            image: "/images/13.jpg",
            rating: 4.5,
            discount: "15%"
        },
        {
            id: 2,
            name: "Laptop Bilgisayar",
            price: "24.999 TL",
            image: "/images/11.jpg",
            rating: 4.8,
            discount: "20%"
        },
        {
            id: 3,
            name: "Kablosuz Kulaklık",
            price: "1.299 TL",
            image: "/images/12.jpg",
            rating: 4.3,
            discount: "10%"
        },
        {
            id: 4,
            name: "Akıllı Saat",
            price: "3.499 TL",
            image: "/images/10.jpg",
            rating: 4.6,
            discount: "25%"
        }
    ];

    const categories = [
        { name: "Elektronik", icon: "📱", color: "#1976d2" },
        { name: "Moda", icon: "👕", color: "#d32f2f" },
        { name: "Ev & Yaşam", icon: "🏠", color: "#388e3c" },
        { name: "Spor", icon: "⚽", color: "#f57c00" },
        { name: "Kozmetik", icon: "💄", color: "#c2185b" },
        { name: "Kitap", icon: "📚", color: "#7b1fa2" }
    ];

    const testimonials = [
        {
            name: "Kıvanç ",
            rating: 5,
            comment: "Harika ürünler ve hızlı teslimat! Ertug Store'dan alışveriş yapmak gerçekten keyifli.",
            avatar: "K"
        },
        {
            name: "Ertug",
            rating: 5,
            comment: "Güvenilir ve kaliteli hizmet. Kesinlikle tavsiye ederim!",
            avatar: "E"
        },
        {
            name: "Anonim",
            rating: 4,
            comment: "Fiyatlar çok uygun ve ürün kalitesi mükemmel.",
            avatar: "A"
        }
    ];

    return (
        <Box>
            {/* Hero Section */}
            <Box sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                py: 8,
                mb: 6
            }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h2" sx={{ 
                                fontWeight: 'bold', 
                                mb: 2,
                                fontSize: { xs: '2.5rem', md: '3.5rem' }
                            }}>
                                Ertug Store
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 3, opacity: 0.9 }}>
                                Güvenilir Alışverişin Adresi
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', opacity: 0.8 }}>
                                2025'ten beri müşterilerimize en kaliteli ürünleri, en uygun fiyatlarla sunuyoruz. 
                                Geniş ürün yelpazemiz ve güvenilir hizmetimizle alışveriş deneyiminizi en üst seviyeye çıkarıyoruz.
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <Button 
                                    variant="contained" 
                                    size="large"
                                    onClick={() => navigate('/catalog')}
                                    sx={{ 
                                        bgcolor: 'white', 
                                        color: 'primary.main',
                                        '&:hover': { bgcolor: 'grey.100' }
                                    }}
                                >
                                    Alışverişe Başla
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    size="large"
                                    onClick={() => navigate('/catalog')}
                                    sx={{ 
                                        borderColor: 'white', 
                                        color: 'white',
                                        '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                                    }}
                                >
                                    Kategorileri Keşfet
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ textAlign: 'center' }}>
                                <img 
                                    src="/images/20.jpg" 
                                    alt="Ertug Store" 
                                    style={{ 
                                        width: '100%', 
                                        maxWidth: '500px',
                                        borderRadius: '20px',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ mb: 6 }}>
                <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, color: 'primary.main' }}>
                    Neden Ertug Store?
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                            <LocalShipping sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                                Hızlı Teslimat
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                24 saat içinde kargoya teslim
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                            <Security sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                                Güvenli Ödeme
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                256-bit SSL şifreleme
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                            <Support sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                                7/24 Destek
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Her zaman yanınızdayız
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                            <ShoppingCart sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                                Kolay İade
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                14 gün içinde ücretsiz iade
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            {/* Categories Section */}
            <Container maxWidth="lg" sx={{ mb: 6 }}>
                <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, color: 'primary.main' }}>
                    Kategoriler
                </Typography>
                <Grid container spacing={3}>
                    {categories.map((category, index) => (
                        <Grid item xs={6} sm={4} md={2} key={index}>
                            <Card 
                                sx={{ 
                                    textAlign: 'center', 
                                    p: 3, 
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                    '&:hover': { transform: 'translateY(-5px)' }
                                }}
                                onClick={() => navigate('/catalog')}
                            >
                                <Typography variant="h3" sx={{ mb: 1 }}>
                                    {category.icon}
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {category.name}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Featured Products */}
            <Container maxWidth="lg" sx={{ mb: 6 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" sx={{ color: 'primary.main' }}>
                        Öne Çıkan Ürünler
                    </Typography>
                    <Button 
                        variant="outlined" 
                        endIcon={<TrendingUp />}
                        onClick={() => navigate('/catalog')}
                    >
                        Tümünü Gör
                    </Button>
                </Box>
                <Grid container spacing={3}>
                    {featuredProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={3} key={product.id}>
                            <Card sx={{ 
                                height: '100%',
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'translateY(-5px)' }
                            }}>
                                <Box sx={{ position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={product.image}
                                        alt={product.name}
                                    />
                                    <Chip 
                                        label={product.discount} 
                                        color="error" 
                                        size="small"
                                        sx={{ 
                                            position: 'absolute', 
                                            top: 10, 
                                            right: 10 
                                        }}
                                    />
                                    <IconButton 
                                        sx={{ 
                                            position: 'absolute', 
                                            top: 10, 
                                            left: 10,
                                            bgcolor: 'rgba(255,255,255,0.9)'
                                        }}
                                    >
                                        <Favorite />
                                    </IconButton>
                                </Box>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                                        {product.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Rating value={product.rating} precision={0.5} size="small" />
                                        <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                                            ({product.rating})
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                        {product.price}
                                    </Typography>
                                    <Button 
                                        variant="contained" 
                                        fullWidth 
                                        sx={{ mt: 2 }}
                                        startIcon={<ShoppingCart />}
                                    >
                                        Sepete Ekle
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Testimonials */}
            <Box sx={{ bgcolor: 'grey.50', py: 6 }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, color: 'primary.main' }}>
                        Müşteri Yorumları
                    </Typography>
                    <Grid container spacing={4}>
                        {testimonials.map((testimonial, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card sx={{ p: 3, height: '100%' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                            {testimonial.avatar}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                {testimonial.name}
                                            </Typography>
                                            <Rating value={testimonial.rating} size="small" />
                                        </Box>
                                    </Box>
                                    <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                                        "{testimonial.comment}"
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Newsletter */}
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Paper sx={{ 
                    p: 4, 
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white'
                }}>
                    <FlashOn sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Fırsatları Kaçırma!
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                        En yeni ürünler ve özel indirimlerden haberdar olmak için e-posta listemize katılın.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <input 
                            type="email" 
                            placeholder="E-posta adresiniz"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                padding: '12px 16px',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '16px',
                                minWidth: '300px'
                            }}
                        />
                        <Button 
                            variant="contained" 
                            size="large"
                            onClick={() => {
                                if (email.trim()) {
                                    setShowSuccessMessage(true);
                                    setEmail('');
                                }
                            }}
                            sx={{ 
                                bgcolor: 'white', 
                                color: 'primary.main',
                                '&:hover': { bgcolor: 'grey.100' }
                            }}
                        >
                            Abone Ol
                        </Button>
                    </Box>
                </Paper>
            </Container>
            
            {/* Success Message Snackbar */}
            <Snackbar
                open={showSuccessMessage}
                autoHideDuration={4000}
                onClose={() => setShowSuccessMessage(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    onClose={() => setShowSuccessMessage(false)} 
                    severity="success" 
                    sx={{ width: '100%' }}
                >
                    Tebrikler! Artık fırsatlardan anında haberdar olacaksınız.
                </Alert>
            </Snackbar>
        </Box>
    );
}