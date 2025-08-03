import { 
    Typography, 
    Container, 
    Paper, 
    Box, 
    Grid, 
    TextField, 
    Button, 
    IconButton,
    Card,
    CardContent,
    Divider
} from "@mui/material";
import { 
    Phone, 
    LocationOn, 
    Email, 
    Send,
    WhatsApp,
    Facebook,
    Instagram
} from "@mui/icons-material";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Burada form verilerini API'ye gönderme işlemi yapılabilir
        console.log('Form data:', formData);
        alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
            <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', color: 'primary.main' }}>
                İletişim
            </Typography>

            <Grid container spacing={4}>
                {/* İletişim Bilgileri */}
                <Grid item xs={12} md={4}>
                    <Card elevation={3} sx={{ height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
                                İletişim Bilgileri
                            </Typography>
                            
                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Phone sx={{ color: 'primary.main', mr: 2 }} />
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                            Telefon
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                            +90 535 666 89 98
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                    <LocationOn sx={{ color: 'primary.main', mr: 2, mt: 0.5 }} />
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                            Adres
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                            Nidakule Ataşehir Batı Ofisi<br />
                                            Barbaros Mah. Begonya Sok. No:1<br />
                                            34746 Ataşehir İstanbul<br />
                                            Türkiye
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Email sx={{ color: 'primary.main', mr: 2 }} />
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                            E-posta
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                            info@ertugstore.com
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                    Sosyal Medya
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton sx={{ color: 'primary.main' }}>
                                        <WhatsApp />
                                    </IconButton>
                                    <IconButton sx={{ color: 'primary.main' }}>
                                        <Facebook />
                                    </IconButton>
                                    <IconButton sx={{ color: 'primary.main' }}>
                                        <Instagram />
                                    </IconButton>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* İletişim Formu */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
                            Bize Ulaşın
                        </Typography>
                        
                        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                            Sorularınız, önerileriniz veya geri bildirimleriniz için aşağıdaki formu kullanabilirsiniz. 
                            En kısa sürede size dönüş yapacağız.
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Ad Soyad"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        variant="outlined"
                                    />
                                </Grid>
                                
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="E-posta"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        variant="outlined"
                                    />
                                </Grid>
                                
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Telefon"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Konu"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        variant="outlined"
                                    />
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Mesajınız"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        multiline
                                        rows={6}
                                        variant="outlined"
                                    />
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        startIcon={<Send />}
                                        sx={{ 
                                            py: 1.5, 
                                            px: 4,
                                            fontSize: '1.1rem'
                                        }}
                                    >
                                        Mesaj Gönder
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Harita veya Ek Bilgiler */}
            <Box sx={{ mt: 6 }}>
                <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                        Çalışma Saatleri
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Pazartesi - Cuma: 09:00 - 18:00<br />
                        Cumartesi - Pazar: Kapalı
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
}