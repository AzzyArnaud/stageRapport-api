const cron = require('node-cron');
const { Op } = require('sequelize');
const Article = require('./models/Articles');
const sequelize = require('./utils/sequerize');

/**
 * Table Articles
 * @author Yvan illich
 * @date 03/09/2024
 * cette fonction se lance tous les jours munuit pour verifier les article qui depassent
 * 3 jour pour les desactive leurs status sera mis à zero et ne sera pas visible sur le front end
 */

// Synchroniser les modèles avec la base de données
sequelize.sync()
  .then(() => {
    // console.log('Modèles synchronisés avec succès.');

    // Tâche cron pour mettre à jour les statuts des articles tous les jours à minuit
    cron.schedule('0 0 * * *', async () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      try {
        // Mise à jour des statuts des articles
        const [updatedCount] = await Article.update(
          { STATUT_ARTICLE: 0 },
          {
            where: {
              DATE_INSERT: {
                [Op.lte]: threeDaysAgo
              },
              STATUT_ARTICLE: 1
            }
          }
        );

        if (updatedCount > 0) {
          console.log(`${updatedCount} articles mis à jour.`);
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour des statuts :', error);
      }
    });
  })
  .catch(error => {
    console.error('Erreur de connexion à la base de données :', error);
  });